import React, { Component } from 'react';

import './CardMovie.css';

export default class CardMovie extends Component {
  getGenre() {
    const { data } = this.props;
    const result = [];
    data.genre.forEach((genre) => {
      result.push(
        <span className="genre__item" key={genre}>
          {genre}
        </span>
      );
    });

    return result;
  }

  render() {
    const { data } = this.props;
    const { title, release, overview, imageURL } = data;

    return (
      <div className="card">
        <div>
          <img src={imageURL} alt="title page" className="card-img" />
        </div>
        <div className="description">
          <h1 className="title">{title}</h1>
          <p className="release">{release}</p>
          <div className="genre">{this.getGenre()}</div>
          <p className="overview">{overview}</p>
        </div>
      </div>
    );
  }
}
