import {
  Layout,
  Menu,
  Typography,
  Button,
  Modal,
  Tabs,
  Icon,
  Row,
  Col,
} from 'antd';
import React from 'react';
import { GetToken, AddToken, ListToken } from './pages';
import './App.css';
import mockTokens from './mockData/tokens';
import { tokenStatus } from './constants';
import _ from 'lodash';
import tokenService from './services/tokenService';
import { getSafe } from './utils/helpers';

const { READY, USED, INVALID, PENDING } = tokenStatus;
const { Header, Content, Footer } = Layout;
const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: null,
      currentToken: {},
    };
  }

  insertTokens = async () => {
    const randomNum = Math.floor(Math.random() * 899999 + 100000).toString(10);
    await tokenService.insertTokens(randomNum);
  };

  render() {
    const { currentToken, tokens } = this.state;
    return (
      <Layout className="top-layer">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content className="body-layer" style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Tabs defaultActiveKey="getTokens">
              <TabPane tab="Get Tokens" key="getTokens">
                <GetToken />
              </TabPane>
              <TabPane tab="List of Tokens" key="listOfTokens">
                <ListToken />
              </TabPane>
              <TabPane tab="Generate Tokens" key="generateTokens">
                <AddToken insertTokens={this.insertTokens} />
              </TabPane>
            </Tabs>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made by Ben Chong 2020</Footer>
      </Layout>
    );
  }
}

export default App;
