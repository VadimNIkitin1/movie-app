import React, { Component } from 'react';
import './App.css';
import { Layout, Tabs, Pagination, Input } from 'antd';
import debounce from 'lodash.debounce';

import 'antd/dist/reset.css';
import ListMovie from './Components/ListMovie/ListMovie';
import MovieAppService from './Services/MovieAppService';
import RatedMovies from './Components/RatedMovies/RatedMovies';

const { Header, Footer, Content } = Layout;
const items = [
  {
    label: 'Search',
    key: 'search',
  },
  {
    label: 'Rated',
    key: 'rated',
  },
];

const headerFooterStyle = {
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
};

export default class App extends Component {
  movieService = new MovieAppService();

  state = {
    movies: [],
    ratedMovies: [],
    totalPages: null,
    currentPage: 1,
    currentRatedPage: 1,
    totalRatedPage: null,
    loading: false,
    error: null,
    label: '',
    tab: true,
  };

  debouceReq = debounce(this.fetchMovies, 800);

  async componentDidMount() {
    const id = localStorage.getItem('id');
    if (!id) {
      localStorage.setItem('id', await this.createGuestSession());
    }
  }

  onChangeTab = () => {
    const { tab } = this.state;
    if (tab) {
      this.fetchRatedMovies();
      this.setState({
        tab: false,
      });
    } else {
      this.setState({
        tab: true,
      });
    }
  };

  onRatedChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
    this.fetchRatedMovies(page);
  };

  onLabelChange = (e) => {
    const { value } = e.target;
    this.setState({
      label: value,
      currentPage: 1,
    });
    this.debouceReq(value, 1);
  };

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
    const { label } = this.state;
    this.debouceReq(label, page);
  };

  addRate = async (id, value) => {
    const rated = JSON.parse(localStorage.getItem('rated')) || {};
    try {
      if (value > 0) {
        await this.movieService.addRate(id, value);
        rated[id] = value;
      } else {
        await this.movieService.deleteRate(id);
        delete rated[id];
      }
    } catch (err) {
      console.error(err);
    }
    localStorage.setItem('rated', JSON.stringify(rated));
  };

  async fetchMovies(query, page = 1) {
    if (!query) {
      this.setState({
        movies: [],
        currentPage: 1,
        totalPages: null,
      });
      return;
    }
    this.setState({
      loading: true,
    });

    try {
      const res = await this.movieService.getAllMovies(query, page);
      this.setState({
        movies: res.movies,
        totalPages: res.totalPages,
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

  async fetchRatedMovies(page) {
    this.setState({
      currentRatedPage: page,
    });
    try {
      const res = await this.movieService.getRatedMovies(page);
      this.setState({
        totalRatedPage: res.totalPages,
        ratedMovies: res.movies,
      });
    } catch (err) {
      this.setState({
        error: err,
      });
    }
  }

  async createGuestSession() {
    let res = [];
    try {
      res = await this.movieService.getSessionId();
    } catch (err) {
      console.error(err);
    }
    return res;
  }

  render() {
    const {
      movies,
      ratedMovies,
      totalPages,
      totalRatedPage,
      currentPage,
      currentRatedPage,
      loading,
      error,
      label,
      tab,
    } = this.state;
    return tab ? (
      <Layout className="app">
        <Header style={headerFooterStyle}>
          <Tabs mode="horizontal" items={items} className="menu" onChange={this.onChangeTab} />
        </Header>
        <Content>
          <Input placeholder="Type to search..." className="input" value={label} onChange={this.onLabelChange} />
          <ListMovie
            data={{
              movies,
              loading,
              error,
            }}
            addRate={this.addRate}
          />
        </Content>
        <Footer style={headerFooterStyle}>
          <Pagination
            defaultCurrent={1}
            total={totalPages}
            current={currentPage}
            onChange={this.onChangePage}
            pageSize={20}
          />
        </Footer>
      </Layout>
    ) : (
      <Layout className="app">
        <Header style={headerFooterStyle}>
          <Tabs mode="horizontal" items={items} className="menu" onChange={this.onChangeTab} />
        </Header>
        <Content>
          <RatedMovies
            data={{
              ratedMovies,
              loading,
              error,
            }}
            addRate={this.addRate}
          />
        </Content>
        <Footer style={headerFooterStyle}>
          <Pagination
            defaultCurrent={1}
            total={totalRatedPage}
            current={currentRatedPage}
            onChange={this.onRatedChangePage}
            pageSize={20}
          />
        </Footer>
      </Layout>
    );
  }
}
