import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import { textCut } from '../../Utilities/text';

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

  selectVoteAverage(average) {
    switch (true) {
      case average <= 3:
        return 'red';
      case average > 3 && average <= 5:
        return 'orange';
      case average > 5 && average <= 7:
        return 'yellow';
      default:
        return 'green';
    }
  }

  render() {
    const { data } = this.props;
    const { title, release, overview, imageURL, voteAverage } = data;

    return (
      <div className="card">
        <div>
          <img src={imageURL} alt="title page" className="card-img" />
        </div>
        <div className="description">
          <div className="title_and_rate">
            <h1 className="title">{title}</h1>
            <div data-scheme={this.selectVoteAverage(voteAverage)} className="rate-circle">
              {voteAverage}
            </div>
          </div>
          <p className="release">{release ? format(release, 'MMMM d, yyyy') : ''}</p>
          <div className="genre">{this.getGenre()}</div>
          <p className="overview">{textCut(overview, 120)}...</p>
          <Rate className="rate" />
        </div>
      </div>
    );
  }
}
