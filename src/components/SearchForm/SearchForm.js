import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import FILTER_OPTIONS from "constants/filterOptions";
import ROUTES from "constants/routes";

const SearchForm = ({
  movieList,
  updateFilteredMovieList,
  filteredMovieList,
}) => {
  const { query } = useParams();
  const [searchMovie, setSearchMovie] = useState(query ? query : "");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [orderBy, setOrderBy] = useState("");

  // * filters data when genre, year, order or new search happens
  useEffect(() => {
    updateFilteredMovieList(allFilter(movieList, genre, year, orderBy));
  }, [filteredMovieList, genre, year, orderBy, movieList]);

  const MOVIE_SEARCH_URL = `${ROUTES.SEARCH.BASE}/${searchMovie}`;

  function filterByGenre(arr, genre) {
    if (genre === "") {
      return arr;
    } else {
      return arr.filter((item) => item.genre_ids.includes(Number(genre)));
    }
  }

  function filterByYear(arr, year) {
    if (year === "") {
      return arr;
    } else {
      return arr.filter((item) => item.release_date.slice(0, 4) === year);
    }
  }

  function orderByReleaseDate(arr, orderBy) {
    if (orderBy === "") return arr;

    const sortedArray = arr.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      const sortOrder = orderBy.toLowerCase();
      if (sortOrder === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    return sortedArray;
  }

  function allFilter(arr, genre, year, orderBy) {
    let arr1 = filterByGenre(arr, genre);
    let arr2 = filterByYear(arr1, year);
    return orderByReleaseDate(arr2, orderBy);
  }

  return (
    <>
      <div className="pt-3 text-white">
        <Container>
          <form>
            <Row>
              <div className="search-bar gap-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Any Movie"
                    value={searchMovie}
                    aria-label="Movie"
                    aria-describedby="input-group-button-right"
                    onChange={(e) => setSearchMovie(e.target.value)}
                  />
                  <Link to={MOVIE_SEARCH_URL}>
                    <button
                      className="btn btn-primary"
                      id="input-group-button-right"
                    >
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </Row>
            <Row className="pt-2 gap-2">
              <Col xs={12} md>
                <div>
                  <label> Genre : </label>
                </div>
                <select
                  className="form-select"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">All</option>
                  {FILTER_OPTIONS.GENRES.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xs={12} md>
                <div>
                  <label> Year : </label>
                </div>
                <select
                  className="form-select"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">All</option>
                  {FILTER_OPTIONS.YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xs={12} md>
                <div>
                  <label> Order By : </label>
                </div>
                <select
                  className="form-select"
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="">None</option>
                  {FILTER_OPTIONS.ORDER_BY.map((orderBy) => (
                    <option key={orderBy} value={orderBy}>
                      {orderBy}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
};

export default SearchForm;
