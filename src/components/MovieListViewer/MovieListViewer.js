import MoviesCard from "components/MoviesCard/MoviesCard";
import NoMovieFound from "components/NoMovieFound/NoMovieFound";
import PaginationMovie from "components/PaginationMovie/PaginationMovie";

const MovieListViewer = ({ movieList, currentPage, updatePage }) => {
  if (movieList.length === 0) {
    return <NoMovieFound />;
  } else {
    return (
      <>
        <div className="movies-list-container pt-2 px-5">
          <div className="d-flex mt-3 flex-wrap justify-content-around">
            {movieList.map((movie) => (
              <MoviesCard key={movie.id} movieDetails={movie} />
            ))}
          </div>
        </div>

        <div className="mt-5 d-flex justify-content-center">
          <PaginationMovie
            currentPage={currentPage}
            handlePageChange={updatePage}
          />
        </div>
      </>
    );
  }
};

export default MovieListViewer;
