import React from 'react';
import './App.css';
import { Layout, Menu, Pagination } from 'antd';

import 'antd/dist/reset.css';
import ListMovie from './Components/ListMovie';

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
    <div className="App">
      <Layout>
        <Header style={headerStyles}>
          <Menu mode="horizontal" items={items} />
        </Header>
        <Content>
          <ListMovie />
        </Content>
        <Footer>
          <Pagination defaultCurrent={1} total={100} />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
