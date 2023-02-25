import { useNavigate } from "react-router-dom";

const NoMovieFound = () => {
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center text-white">
      <div className="fs-4">No Movie Found !!!</div>
      <button className="btn btn-danger text-grey" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default NoMovieFound;
