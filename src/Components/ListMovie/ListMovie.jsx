import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import CardMovie from '../CardMovie.css/CardMovie';

import './ListMovie.css';

export default class ListMovie extends Component {
  moviesList(movies) {
    const { addRate } = this.props;
    const result = [];
    if (movies) {
      movies.forEach((elem) => {
        result.push(<CardMovie data={elem} key={elem.id} addRate={addRate} />);
      });
    }
    return result;
  }

  render() {
    const { data } = this.props;
    const { movies, loading, error } = data;
    if (loading) {
      return <Spin tip="Loading" size="large" className="spin" />;
    }

    if (movies.length === 0) {
      return <Alert message="No movies found for your search" type="success" />;
    }

    if (error) {
      return <Alert message="Error Text" description={error.message} type="error" closable />;
    }
    return <div className="list-movie">{this.moviesList(movies)}</div>;
  }
}
