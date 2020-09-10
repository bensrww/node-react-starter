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
  Radio,
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
      team: null,
    };
  }

  insertTokens = async () => {
    const randomNum = Math.floor(Math.random() * 899999 + 100000).toString(10);
    await tokenService.insertTokens(randomNum);
  };

  handleTabChange = (activeKey) => {
    if (activeKey === 'listOfTokens' && this.refs.listTokenPage)
      this.refs.listTokenPage.refreshTokens();
  };

  handleTeamChange = (e) => {
    this.setState({ team: e.target.value });
  };

  render() {
    return (
      <Layout className="top-layer">
        <Radio.Group onChange={this.handleTeamChange} defaultValue={2}>
          <Radio.Button value={2}>T2</Radio.Button>
          <Radio.Button value={3}>T3</Radio.Button>
        </Radio.Group>
        <Content className="body-layer" style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Tabs defaultActiveKey="getTokens" onChange={this.handleTabChange}>
              <TabPane tab="Get Tokens" key="getTokens">
                <GetToken />
              </TabPane>
              <TabPane tab="List of Tokens" key="listOfTokens">
                <ListToken ref="listTokenPage" />
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
