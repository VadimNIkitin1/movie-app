import React from 'react';
import './App.css';
import { Layout, Menu, Pagination, Input } from 'antd';

import 'antd/dist/reset.css';
import ListMovie from './Components/ListMovie/ListMovie';

const { Header, Footer, Content } = Layout;

const headerStyles = {
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
};

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

function App() {
  return (
    <Layout className="app">
      <Header style={headerStyles}>
        <Menu mode="horizontal" items={items} />
      </Header>
      <Content>
        <Input placeholder="Type to search..." style={{ margin: '19px 0 34px 0' }} />
        <ListMovie />
      </Content>
      <Footer>
        <Pagination defaultCurrent={1} total={100} />
      </Footer>
    </Layout>
  );
}

export default App;
