import React from "react";

import Layout from "containers/Layout/Layout";

import MoviesPage from "components/MoviesPage/MoviesPage";

const Movies = () => (
  <Layout>
    <section>
      <MoviesPage />
    </section>
  </Layout>
);

export default Movies;
