import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MovieCreditAPI from "api/MovieAPI/MovieCreditAPI";
import MovieDetailAPI from "api/MovieAPI/MovieDetailsAPI";

import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import TvDetailAPI from "api/TvAPI/TvDetailsAPI";
import TvCreditAPI from "api/TvAPI/TvCreditAPI";

const MovieDetailContent = ({ currentMovieCredit, currentMovieDetail }) => {
  console.log(currentMovieDetail);
  const getDirector = () => {
    if (currentMovieCredit.crew) {
      return currentMovieCredit.crew.find((crewItem) => crewItem.job === "Director");
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

  // src={`https://www.2embed.to/embed/imdb/tv?id=${currentMovieDetail.imdb_id}/s=${seasonId}&e=${episodeId}`}

  return (
    <div className="text-light pt-5 ">
      <div className="px-4 mt-4">
        <div className="bg-dark responsive-iframe">
          <iframe
            src={`https://www.2embed.cc/embed/${currentMovieDetail.imdb_id}`}
            width="100%"
            allowFullScreen="true"
          ></iframe>
          {/* <VideoPlayer /> */}
        </div>
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
              {directorInfo ? directorInfo.name : "DIRECTOR INFORMATION MISSING"}
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

const TvDetailContent = ({ currentTvCredit, currentTvDetail }) => {
  console.log(currentTvDetail);

  return (
    <div className="px-4">
      <div className="mt-4 bg-dark responsive-iframe">
        <iframe
          // src = {`https://www.2embed.cc/embedtv/{IMDB-ID}or{TMDB-ID}&s={seasonNumber}&e={episodeNumber}`}
          // src={`https://www.2embed.cc/embed/imdb/movie?id=${1}`}
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

const DetailPage = () => {
  const params = useParams();
  const [isMovie, setIsMovie] = useState(false);
  const [isSeries, setIsSeries] = useState(false);

  const [currentMovieDetail, setCurrentMovieDetail] = useState([]);
  const [currentMovieCredit, setCurrentMovieCredit] = useState([]);
  const [currentTvDetail, setCurrentTvDetail] = useState([]);
  const [currentTvCredit, setCurrentTvCredit] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.movieId) {
      setIsMovie(true);
    } else if (params.tvId) {
      setIsSeries(true);
    }
  });

  // * Gets Movie Data and Movie Credit Data. (uses param for Movie-id)
  useEffect(() => {
    setIsLoading(true);
    if (isMovie) {
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
    } else if (isSeries) {
      const fetchTvDetails = async () => {
        const response = await TvDetailAPI.get(params.tvId);
        setCurrentTvDetail(response.data);
      };

      const fetchTvCast = async () => {
        const response = await TvCreditAPI.get(params.tvId);
        setCurrentTvCredit(response.data);
      };

      Promise.all([fetchTvCast(), fetchTvDetails()]).then(() => {
        setIsLoading(false);
      });
    }
  }, [isMovie, isSeries]);

  if (isLoading) {
    <LoadingSpinner />;
  } else if (isMovie) {
    return <MovieDetailContent currentMovieCredit={currentMovieCredit} currentMovieDetail={currentMovieDetail} />;
  } else if (isSeries) {
    return <TvDetailContent currentTvCredit={currentTvCredit} currentTvDetail={currentTvDetail} />;
  }
};

export default DetailPage;
