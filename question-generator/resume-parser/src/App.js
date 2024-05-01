import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CiFileOn } from "react-icons/ci";
import { GiHumanTarget } from "react-icons/gi";
import Loader from "./loader";

function App() {

  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [processedData, setProcessedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setResume(file);
    console.log(resume);
  };

    const onSubmit = async (e) => {
      e.preventDefault();
      setLoading(true); 
      console.log(resume);
      console.log(jobDescription);

      const data = new FormData();
      data.append("resume", resume);
      data.append("jobDescription", jobDescription);

      const url ="/submit";
      const options = {
        method: "POST",
        body: data,
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      setProcessedData(responseData);
      setLoading(false);
    };

  return (
    <div style={{ backgroundColor: "rgb(11, 15, 25)", height: "100vh" }}>
      <div
        style={{
          padding: "10px",
          width: "80%",
          margin: "auto",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "normal",
            textAlign: "center",
          }}
        >
          Interview Question Generator
        </h1>
        <p style={{ fontWeight: "300", textAlign: "center" }}>
          Upload a PDF resume and provide the job description. The system will
          process the resume and extract relevant data. You can navigate through
          the processed pages below.
        </p>
      </div>
      <div
        style={{
          padding: "20px",
          width: "80%",
          margin: "auto",
          color: "white",
          backgroundColor: "rgb(18, 26, 46)",
          borderRadius: "10px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", color: "white" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="white"
              borderBottom="#eb7d34"
            >
              <Tab
                label="Process CV"
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
                value="1"
                borderColor="#eb7d34"
              />
              <Tab
                label="Interview"
                value="2"
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
              />
              <Tab
                label="Skill Gap"
                value="3"
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
              />
              <Tab
                label="Cover Letter"
                value="4"
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: "lighter",
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "5px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  backgroundColor: "rgb(11, 15, 25)",
                  borderRadius: "10px",
                  height: "320px",
                  width: "50%",
                  margin: "5px",
                }}
              >
                <div>
                  <form onSubmit={onSubmit}>
                    <div
                      style={{
                        backgroundColor: "rgb(36, 44, 64)",
                        height: "80px",
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "14px",
                          marginTop: "7px",
                        }}
                      >
                        <CiFileOn style={{ fontSize: "15px", margin: "2px" }} />
                        <p
                          style={{
                            fontWeight: "300",
                            textAlign: "left",
                            margin: "1px",
                            fontSize: "13px",
                            marginLeft: "7px",
                          }}
                        >
                          Upload a PDF resume
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        style={{
                          fontWeight: "300",
                          textAlign: "left",
                          margin: "1px",
                          fontSize: "13px",
                          marginLeft: "20px",
                          fontFamily: "Poppins",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgb(36, 44, 64)",
                        height: "150px",
                        borderRadius: "10px",
                        margin: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "14px",
                          marginTop: "7px",
                          paddingTop: "10px",
                          marginBottom: "7px",
                        }}
                      >
                        <GiHumanTarget
                          style={{
                            fontSize: "16px",
                            margin: "2px",
                            marginTop: "3px",
                          }}
                        />
                        <p
                          style={{
                            fontWeight: "300",
                            textAlign: "left",
                            margin: "1px",
                            fontSize: "13px",
                            marginLeft: "7px",
                          }}
                        >
                          Job Description
                        </p>
                      </div>
                      <textarea
                        id="jd"
                        value={jobDescription}
                        placeholder="Enter Job Description Here ..."
                        onChange={(e) => setJobDescription(e.target.value)}
                        style={{
                          backgroundColor: "rgb(36, 44, 64)",
                          borderWidth: "1px",
                          borderRadius: "8px",
                          marginLeft: "13px",
                          width: "93%",
                          height: "90px",
                          color: "white",
                          fontFamily: "Poppins",
                          fontSize: "10px",
                          fontWeight: "lighter",
                          paddingLeft: "10px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                      }}
                    >
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "rgb(67, 68, 70)",
                          height: "40px",
                          borderRadius: "10px",
                          border: "0px",
                          width: "50%",
                          marginRight: "10px",
                          color: "white",
                          fontFamily: "Poppins",
                        }}
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "rgb(102, 125, 255)",
                          height: "40px",
                          borderRadius: "10px",
                          border: "0px",
                          width: "50%",
                          marginRight: "2.5px",
                          fontFamily: "Poppins",
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgb(11, 15, 25)",
                  borderRadius: "10px",
                  height: "320px",
                  width: "50%",
                  margin: "5px",
                }}
              >
                {loading ? (
                  <div
                    style={{
                      width: "100%", // Make the container full width
                      height: "100%", // Make the container full height
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      zIndex: 9999, // Ensure the loading indicator is above other content
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        backgroundColor: "rgb(36, 44, 64)",
                        height: "290px",
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          marginLeft: "14px",
                          paddingTop: "10px",
                          height: "275px",
                          overflowY: "scroll",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "300",
                            textAlign: "left",
                            margin: "1px",
                            fontSize: "13px",
                            marginLeft: "7px",
                            marginBottom: "7px",
                          }}
                        >
                          Processed CV
                        </p>
                        {processedData && (
                          <p
                            style={{
                              fontWeight: "300",
                              textAlign: "left",
                              margin: "1px",
                              fontSize: "13px",
                              marginLeft: "7px",
                              color: "#85858a",
                            }}
                          >
                            {processedData.cv_text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "5px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  backgroundColor: "rgb(11, 15, 25)",
                  borderRadius: "10px",
                  height: "320px",
                  width: "50%",
                  margin: "5px",
                }}
              >
                <p
                  style={{
                    fontWeight: "300",
                    textAlign: "left",
                    margin: "20px",
                    fontSize: "13px",
                    marginLeft: "25px",
                  }}
                >
                  Technical Questions
                </p>

                {loading ? (
                  <div
                    style={{
                      width: "100%", // Make the container full width
                      height: "100%", // Make the container full height
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      zIndex: 9999, // Ensure the loading indicator is above other content
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <div>
                    <p
                      style={{
                        fontWeight: "300",
                        textAlign: "left",
                        margin: "20px",
                        marginTop: "10px",
                        height: "240px",
                        overflowY: "scroll",
                        fontSize: "13px",
                        marginLeft: "7px",
                        color: "#85858a",
                      }}
                    >
                      {processedData && (
                        <ol>
                          {processedData.technical_questions.map(
                            (question, index) => (
                              <li key={index}>{question}</li>
                            )
                          )}
                        </ol>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div
                style={{
                  backgroundColor: "rgb(11, 15, 25)",
                  borderRadius: "10px",
                  height: "320px",
                  width: "50%",
                  margin: "5px",
                }}
              >
                <p
                  style={{
                    fontWeight: "300",
                    textAlign: "left",
                    margin: "20px",
                    fontSize: "13px",
                    marginLeft: "20px",
                  }}
                >
                  Behavior Questions
                </p>
                {loading ? (
                  <div
                    style={{
                      width: "100%", // Make the container full width
                      height: "100%", // Make the container full height
                      display: "flex",
                      justifyContent: "center", // Center horizontally
                      alignItems: "center", // Center vertically
                      zIndex: 9999, // Ensure the loading indicator is above other content
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <div>
                    <p
                      style={{
                        fontWeight: "300",
                        textAlign: "left",
                        margin: "20px",
                        marginTop: "10px",
                        height: "240px",
                        overflowY: "scroll",
                        fontSize: "13px",
                        marginLeft: "7px",
                        color: "#85858a",
                      }}
                    >
                      {processedData && (
                        <ol>
                          {processedData.behavior_questions.map(
                            (question, index) => (
                              <li key={index}>{question}</li>
                            )
                          )}
                        </ol>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="3" sx={{ padding: "5px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  backgroundColor: "rgb(11, 15, 25)",
                  borderRadius: "10px",
                  height: "330px",
                  width: "100%",
                  margin: "5px",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    width: "90%",
                    borderRadius: "10px",
                    margin: "auto",
                    marginTop: "20px",
                    padding: "5px",
                  }}
                >
                  {loading ? (
                    <div
                      style={{
                        width: "100%", // Make the container full width
                        height: "100%", // Make the container full height
                        display: "flex",
                        justifyContent: "center", // Center horizontally
                        alignItems: "center", // Center vertically
                        zIndex: 9999, // Ensure the loading indicator is above other content
                      }}
                    >
                      <Loader />
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          backgroundColor: "rgb(36, 44, 64)",
                          height: "70px",
                          borderRadius: "10px",
                          margin: "10px",
                          padding: "5px",
                        }}
                      >
                        {processedData && (
                          <div>
                            <h5
                              style={{
                                textAlign: "center",
                                margin: "1px",
                                fontWeight: "lighter",
                              }}
                            >
                              Similarity Between Job decription and Resume
                            </h5>
                            <h1 style={{ textAlign: "center", margin: "1px" }}>
                              {processedData.similarity_percentage} %
                            </h1>
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          backgroundColor: "rgb(36, 44, 64)",
                          height: "180px",
                          borderRadius: "10px",
                          margin: "10px",
                          padding: "5px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "14px",
                            paddingTop: "10px",
                            height: "160px",
                            overflowY: "scroll",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: "300",
                              textAlign: "left",
                              margin: "1px",
                              fontSize: "13px",
                              marginLeft: "7px",
                              marginBottom: "7px",
                            }}
                          >
                            Skill Gap Analysis
                          </p>
                          {processedData && (
                            <p
                              style={{
                                fontWeight: "300",
                                textAlign: "left",
                                margin: "1px",
                                fontSize: "13px",
                                color: "#85858a",
                              }}
                            >
                              {processedData.skill_gap.map((item, index) => (
                                <div key={index}>
                                  <p>
                                    {item.generated_text}
                                    <br />
                                  </p>
                                </div>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="4" sx={{ padding: "5px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  backgroundColor: "rgb(11, 15, 25)",
                  borderRadius: "10px",
                  height: "330px",
                  width: "100%",
                  margin: "5px",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    width: "90%",
                    borderRadius: "10px",
                    margin: "auto",
                    marginTop: "20px",
                    padding: "5px",
                  }}
                >
                  {loading ? (
                    <div
                      style={{
                        width: "100%", // Make the container full width
                        height: "100%", // Make the container full height
                        display: "flex",
                        justifyContent: "center", // Center horizontally
                        alignItems: "center", // Center vertically
                        zIndex: 9999, // Ensure the loading indicator is above other content
                      }}
                    >
                      <Loader />
                    </div>
                  ) : (
                    <div>

                      <div
                        style={{
                          backgroundColor: "rgb(36, 44, 64)",
                          height: "260px",
                          borderRadius: "10px",
                          margin: "10px",
                          padding: "5px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "14px",
                            paddingTop: "10px",
                            height: "250px",
                            overflowY: "scroll",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: "300",
                              textAlign: "left",
                              margin: "1px",
                              fontSize: "13px",
                              marginLeft: "7px",
                              marginBottom: "7px",
                            }}
                          >
                            Cover Letter
                          </p>
                          {processedData && (
                            <p
                              style={{
                                fontWeight: "300",
                                textAlign: "left",
                                margin: "1px",
                                fontSize: "13px",
                                color: "#85858a",
                              }}
                            >
                              {processedData.cover_Letter.map((item, index) => (
                                <div key={index}>
                                  <p>
                                    {item.generated_text}
                                    <br />
                                  </p>
                                </div>
                              ))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleFileUpload} />
        <div>
          <label htmlFor="job description">Job description</label>
          <input
            type="text"
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      {/* /* Display processedData */}
      {processedData && (
        <div>
          <h2>Technical Questions:</h2>
          <ul>
            {processedData.technical_questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <h2>Behavior Questions:</h2>
          <ul>
            {processedData.behavior_questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <h2>Similarity Percentage</h2>
          <div>{processedData.similarity_percentage}</div>
          <h2>Similarity Percentage</h2>
          <div>{processedData.cv_text}</div>
        </div>
      )}
    </div>
  );
}

export default App;



