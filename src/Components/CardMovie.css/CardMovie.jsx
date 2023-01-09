import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import { textCut } from '../../Utilities/text';

import './CardMovie.css';

export default class CardMovie extends Component {
  state = {
    rateValue: 0,
  };

  componentDidMount() {
    const { data } = this.props;
    const rated = JSON.parse(localStorage.getItem('rated')) || {};
    const value = rated[data.id] || 0;
    this.setState({
      rateValue: value,
    });
  }

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

  onRateChange = (rate) => {
    const { data, addRate } = this.props;
    this.setState({
      rateValue: rate,
    });
    addRate(data.id, rate);
  };

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
    const { rateValue } = this.state;
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
          <p className="overview">{textCut(overview, 180)}...</p>
          <Rate allowHalf className="rate" count={10} value={rateValue} onChange={this.onRateChange} />
        </div>
      </div>
    );
  }
}
