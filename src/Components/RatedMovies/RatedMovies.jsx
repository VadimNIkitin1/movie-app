import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import CardMovie from '../CardMovie/CardMovie';

export default class RatedMovies extends Component {
  moviesList() {
    const { addRate } = this.props;
    const {
      data: { ratedMovies },
    } = this.props;

    return ratedMovies.map((elem) => <CardMovie data={elem} key={elem.id} addRate={addRate} />);
  }

  render() {
    const { data } = this.props;
    const { loading, error, ratedMovies } = data;

    if (loading) {
      return <Spin tip="Loading" size="large" className="spin" />;
    }

    if (ratedMovies.length === 0) {
      return <Alert message="No movies found for your search" type="success" />;
    }

    if (error) {
      return <Alert message="Error Text" description={error.message} type="error" closable />;
    }
    return <div className="list-movie">{this.moviesList()}</div>;
  }
}
