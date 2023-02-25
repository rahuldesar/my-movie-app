import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MovieCreditAPI from "api/MovieCreditAPI/MovieCreditAPI";
import MovieDetailAPI from "api/MovieDetailsAPI/MovieDetailsAPI";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";

const DetailContent = ({ currentMovieCredit, currentMovieDetail }) => {
  const getDirector = () => {
    if (currentMovieCredit.crew) {
      return currentMovieCredit.crew.find(
        (crewItem) => crewItem.job === "Director"
      );
    } else {
      return { name: "CREW INFORMATION MISSING" };
    }
  };

  const getFiveCast = () => {
    if (currentMovieCredit.cast) {
      return currentMovieCredit.cast.slice(0, 5);
    } else {
      return [{ name: "CAST INFORMATION MISSING" }];
    }
  };

  const directorInfo = getDirector();
  const fiveCast = getFiveCast();

  return (
    <div className="text-light pt-5 ">
      <div className="mt-4 mx-sm-5 bg-dark">
        <VideoPlayer />
      </div>
      <div className="w-75 m-auto pt-3 pb-5">
        <h4 className="mt-2 text-primary"> {currentMovieDetail.title} </h4>
        <div>{currentMovieDetail.overview}</div>
        <div className="d-flex flex-column flex-sm-row pt-4 gap-lg-5 gap-2 justify-content-between">
          <div className="d-flex flex-column gap-2">
            <div>
              <span className="fw-bold">Genre : </span>
              {currentMovieDetail.genres.map((genre, index) => (
                <li key={genre.id} className=" list-group-item d-inline">
                  {genre.name}
                  {index + 1 !== currentMovieDetail.genres.length ? ", " : ""}
                </li>
              ))}
            </div>
            <div>
              <span className="fw-bold">Cast : </span>

              {fiveCast.map((castItem, index) => (
                <li key={castItem.id} className=" list-group-item d-inline">
                  {castItem.name}
                  {index + 1 !== fiveCast.length ? ", " : ""}
                </li>
              ))}
            </div>
            <div>
              <span className="fw-bold">Director : </span>
              {directorInfo
                ? directorInfo.name
                : "DIRECTOR INFORMATION MISSING"}
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <div>
              <span className="fw-bold">Duration : </span>
              {currentMovieDetail.runtime} mins
            </div>
            <div>
              <span className="fw-bold">Released Year : </span>
              {currentMovieDetail.release_date.slice(0, 4)}
            </div>
            <div>
              <span className="fw-bold">Country : </span>
              {currentMovieDetail.production_countries[0].name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailPage = () => {
  const params = useParams();
  const [currentMovieDetail, setCurrentMovieDetail] = useState([]);
  const [currentMovieCredit, setCurrentMovieCredit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // * Gets Movie Data and Movie Credit Data. (uses param for Movie-id)
  useEffect(() => {
    setIsLoading(true);
    const fetchMovieDetails = async () => {
      const response = await MovieDetailAPI.get(params.movieId);
      setCurrentMovieDetail(response.data);
    };

    const fetchMovieCredit = async () => {
      const response = await MovieCreditAPI.get(params.movieId);
      setCurrentMovieCredit(response.data);
    };

    Promise.all([fetchMovieDetails(), fetchMovieCredit()]).then(() => {
      setIsLoading(false);
    });
  }, [params]);

  if (isLoading) {
    <LoadingSpinner />;
  } else {
    return (
      <DetailContent
        currentMovieCredit={currentMovieCredit}
        currentMovieDetail={currentMovieDetail}
      />
    );
  }
};

export default DetailPage;
