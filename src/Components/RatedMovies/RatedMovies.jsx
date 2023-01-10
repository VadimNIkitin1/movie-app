import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import MovieAppService from '../../Services/MovieAppService';
import CardMovie from '../CardMovie/CardMovie';

export default class RatedMovies extends Component {
  movieService = new MovieAppService();

  state = {
    ratedMovies: [],
  };

  async componentDidMount() {
    this.setState({
      ratedMovies: await this.fetchRatedMovies(),
    });
  }

  async fetchRatedMovies() {
    return await this.movieService.getRatedMovies();
  }

  moviesList() {
    const { addRate } = this.props;
    const { ratedMovies } = this.state;
    return ratedMovies.map((elem) => <CardMovie data={elem} key={elem.id} addRate={addRate} />);
  }

  render() {
    const { data } = this.props;
    const { loading, error } = data;
    const { ratedMovies } = this.state;
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
