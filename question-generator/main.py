
# required imports
import re
from flask import Flask, request, render_template
from flask_wtf import FlaskForm
import numpy as np
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
from numpy.linalg import norm
import os
from wtforms.validators import InputRequired
import PyPDF2
from gensim.models.doc2vec import Doc2Vec
from scipy.spatial.distance import cosine

# setup variables
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mykey'
app.config['UPLOAD_FOLDER'] = 'static/files'
global keywords, filePath, jd
keywords, matches = [], []
filePath, score , jd  = '', '', ''
model = Doc2Vec.load('cv_job_maching.model')
# results = open('Resume Parser/results.txt', 'w+')

# UploadFileForm class used to upload file from HTML
class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")


def organize_cv_details(cv_text):
    sections = {
        'name': '',
        'experience': [],
        'academic_qualifications': [],
        'certifications': [],
        'skills': [],
        # Add more sections as needed
    }

    # Split the CV text into lines for easier processing
    lines = cv_text.split('\n')

    current_section = None
    for line in lines:
        # Identify the section headers
        if 'experience' in line.lower():
            current_section = 'experience'
        elif 'education' in line.lower() or 'academic qualifications' in line.lower():
            current_section = 'academic_qualifications'
        elif 'skills' in line.lower():
            current_section = 'skills'
        elif 'certifications' in line.lower():
            current_section = 'certifications'
        # Add more section headers as needed

        # Parse the details based on the current section
        if current_section == 'experience':
            sections['experience'].append(line.strip())
        elif current_section == 'academic_qualifications':
            sections['academic_qualifications'].append(line.strip())
        elif current_section == 'skills':
            sections['skills'].append(line.strip())
        elif current_section == 'certifications':
            sections['certifications'].append(line.strip())
        # Add more parsing logic for other sections as needed

    # Extract name (assuming it's the first line)
    sections['name'] = lines[0].strip()

    return sections



# url schema
@app.route('/', methods=['GET', 'POST'])
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    global keywords, score, matches, filePath, jd
    similarity_percentage, errorMessage, scoreMessage, matchesMessage, uploadResult, keyword_string,question = '', '', '', '', '', '',''
    cv_details = {
        'name': '',
        'experience': [],
        'academic_qualifications': [],
        'certifications': [],
        'skills':[],
        # Add more sections as needed
    }

    if request.method == "POST":

        # when the submit keyword button is clicked
        if 'kw' in request.form:
            keyword = request.form['kw']
            if keyword != '' and not keyword.isspace() and " " not in list(keyword):
                keywords.append(keyword)
            elif " " in list(keyword):
                splitWord = keyword.split(' ')
                for i in splitWord:
                    if i.isspace() == False and i != '':
                        keywords.append(i)

        # Get the job description input
        if 'job_description' in request.form:
            jd = request.form['job_description']
            print(jd)

        # when the reset button is  clicked
        elif 'r' in request.form:
            keywords = []

    # when the upload file button is clicked
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data
        # check if file is a pdf
        if file.filename.rsplit('.', 1)[1].lower() == 'pdf':
            # generate path and filename
            filePath = os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))
            file.save(filePath)
            uploadResult = "File uploaded successfully."
        else:
            uploadResult = "Invalid file type (.pdf only)."

    # when the parse button is clicked
    if 'p' in request.form and filePath != '' and len(keywords) > 0:
        resumewords = pdfToText(filePath)
        score, matches = matchKeywords(keywords, resumewords)
        score = round(score*100, 2)
        scoreMessage = 'Score: ' + str(score) + '%'
        matchesMessage = 'Matching words: ' + str(matches)
        
        # # Parse and print the details of the CV
        # with open(filePath, 'rb') as pdf_file:
        #     pdf_reader = PyPDF2.PdfReader(pdf_file)
        #     num_pages = len(pdf_reader.pages)
        #     for page_num in range(num_pages):
        #         page = pdf_reader.pages[page_num]
        #         cv_details += page.extract_text()

        # Parse CV details
        with open(filePath, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            cv_text = ''
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                cv_text += page.extract_text()

            # Organize CV details into sections
            cv_details = organize_cv_details(cv_text)

        if 'job_description' in request.form:
            jd = request.form['job_description']

        keyword_string = ' '.join(keywords)

        input_CV = preprocess_text(cv_text)
        input_JD = preprocess_text(jd)
        v1 = model.infer_vector(input_CV.split())
        v2 = model.infer_vector(input_JD.split())
        similarity = 100*(np.dot(np.array(v1), np.array(v2))) / (norm(np.array(v1)) * norm(np.array(v2)))
        similarity_percentage = round(similarity, 2)
        print(similarity_percentage)

        question = "Can Generate Question"

        with open("results.txt", "a") as fo:
            fo.write(str(score) + '%\t\t\n\tFILEPATH: ' + str(filePath) + '\t\t\n\tKEYWORDS: ' + str(keywords) + '\t\t\n\tMATCHES: ' + str(matches) + '\t\t\n\n')
    elif filePath == '':
        errorMessage = 'Please upload a file.'
        question = "Can't Generate Question"
    elif len(keywords) == 0:
        errorMessage = 'Please enter keywords.'

        

    keywords = formatWordlist(keywords)

    # render HTML
    return render_template('submit.html',question=question, keyword_string=keyword_string ,form=form, keywords=keywords, scoreMessage=scoreMessage, matchesMessage=matchesMessage, cv_details=cv_details, uploadResult=uploadResult, similarity_percentage=similarity_percentage, errorMessage=errorMessage, jd=jd)


# page to review submitted resumes
@app.route('/review', methods=['GET', 'POST'])
def review():
    with open("results.txt", 'r') as fi:
        results = str(fi.read())
    # render HTML
    return render_template('review.html', results=results)

def preprocess_text(text):
    # Convert the text to lowercase
    text = text.lower()
    
    # Remove punctuation from the text
    text = re.sub('[^a-z]', ' ', text)
    
    # Remove numerical values from the text
    text = re.sub(r'\d+', '', text)
    
    # Remove extra whitespaces
    text = ' '.join(text.split())
    
    return text

# format keywords to be lowercase and have no special characters or spaces
def formatWordlist(wordlist):
    # set all strings to lowercase
    wordlist = [x.lower() for x in wordlist]

    # remove all special characters
    removetable = str.maketrans('', '', " ~`!@#$%^&*()_-+=<>,.;:'?/\|{]}[•–\n")
    wordlist = [s.translate(removetable) for s in wordlist]

    return list(set(wordlist))


# convert pdf file to text understandable by python
def pdfToText(path):
    # creating a pdf file object
    pdfFileObj = open(path, 'rb')
    # creating a pdf reader object
    pdfReader = PyPDF2.PdfReader(pdfFileObj)
    # creating a page object
    pageObj = pdfReader.pages[0]
    # extracting text from page
    resumeText = pageObj.extract_text()
    # closing the pdf file object
    pdfFileObj.close()
    # split text by spaces and only store unique values
    textArray = set(resumeText.split(" "))
    # set all values to lowercase
    textArray = [x.lower() for x in textArray]
    # remove all special characters
    removetable = str.maketrans('', '', " ~`!@#$%^&*()_-+=<>,.;:'?/\|{]}[•–\n")
    textArray = [s.translate(removetable) for s in textArray]

    return list(set(textArray))


# match keywords with words in resume and score the resume based off of how many matches there were
def matchKeywords(keywords, resumewords):
    matches = 0
    matchedWords = []
    for word in keywords:
        if word in resumewords:
            matches += 1
            matchedWords.append(word)
    score = matches/len(keywords)
    return score, matchedWords


if __name__ == '__main__':
    app.run(debug=False)
