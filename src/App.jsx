import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Pagination, Input } from 'antd';
import debounce from 'lodash.debounce';

import 'antd/dist/reset.css';
import ListMovie from './Components/ListMovie/ListMovie';
import MovieAppService from './Services/MovieAppService';

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
    totalPages: null,
    currentPage: 1,
    loading: false,
    error: null,
    label: '',
  };

  // async componentDidMount() {
  //   await this.fetchMovies('return', 1);
  // }

  debouceReq = debounce(this.fetchMovies, 800);

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

    const res = await this.movieService.getAllMovies(query, page);
    try {
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

  render() {
    const { movies, totalPages, currentPage, loading, error, label } = this.state;
    return (
      <Layout className="app">
        <Header style={headerFooterStyle}>
          <Menu mode="horizontal" items={items} className="menu" selectedKeys={['search']} />
        </Header>
        <Content>
          <Input placeholder="Type to search..." className="input" value={label} onChange={this.onLabelChange} />
          <ListMovie
            data={{
              movies,
              loading,
              error,
            }}
          />
        </Content>
        <Footer style={headerFooterStyle}>
          <Pagination defaultCurrent={1} total={totalPages} current={currentPage} onChange={this.onChangePage} />
        </Footer>
      </Layout>
    );
  }
}