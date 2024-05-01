import { TailSpin } from "react-loader-spinner";
const LoaderComp = () => {
  return (
    <div>
      <TailSpin
        height="40"
        width="40"
        style={{ margin: "200px" }}
        color="rgb(102, 125, 255)"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p
        style={{
          fontWeight: "300",
          textAlign: "left",
          margin: "1px",
          fontSize: "11px",
        }}
      >
        Loading
      </p>
    </div>
  );
};
export default LoaderComp;
