import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center text-center spinner text-light">
      <Spinner animation="border" />
    </div>
  );
}

export default LoadingSpinner;
