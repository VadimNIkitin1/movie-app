import React, { Component } from 'react';

export default class CardMovie extends Component {
  state = {
    title: '',
    release: '',
    genre: '',
    overview: '',
    imageURL: '',
  };

  componentDidMount() {
    this.searchFilms();
  }

  searchFilms() {
    const { data } = this.props;
    this.setState({
      title: data.title,
      release: data.release,
      genre: data.genre,
      overview: data.overview,
      imageURL: data.imageURL,
    });
  }

  render() {
    const { title, release, genre, overview, imageURL } = this.state;

    return (
      <div className="Card">
        <img src={imageURL} alt="title page" />
        <div>
          <h1>{title}</h1>
          <p>{release}</p>
          <p>{genre}</p>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
}
