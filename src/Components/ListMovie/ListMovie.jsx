import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import MovieAppService from '../../Services/MovieAppService';
import CardMovie from '../CardMovie.css/CardMovie';

import './ListMovie.css';

export default class ListMovie extends Component {
  movieService = new MovieAppService();

  state = {
    movies: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  async fetchMovies() {
    this.setState({
      loading: true,
    });

    try {
      const movies = await this.movieService.getAllMovie();
      this.setState({
        movies,
      });
    } catch (err) {
      this.setState({
        error: err,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  moviesList() {
    const { movies } = this.state;
    const result = [];
    movies.forEach((elem) => {
      result.push(<CardMovie data={elem} key={elem.id} />);
    });
    return result;
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <Spin tip="Loading" size="large" className="spin" />;
    }

    if (error) {
      return <Alert message="Error Text" description={error.message} type="error" closable />;
    }
    return <div className="list-movie">{this.moviesList()}</div>;
  }
}
