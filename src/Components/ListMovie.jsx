import React, { Component } from 'react';

import MovieAppService from '../Services/MovieAppService';

import CardMovie from './CardMovie';

export default class ListMovie extends Component {
  movieService = new MovieAppService();

  state = {
    movies: [],
  };

  async componentDidMount() {
    this.setState({
      movies: await this.movieService.getAllMovie(1),
    });
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
    return <div>{this.moviesList()}</div>;
  }
}
