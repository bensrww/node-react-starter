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
import { TeamNumberContext } from './TeamNumberContext';

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

  handleTabChange = (activeKey) => {
    if (activeKey === 'listOfTokens' && this.refs.listTokenPage)
      this.refs.listTokenPage.refreshTokens();
  };

  handleTeamChange = (e) => {
    this.setState({ team: e.target.value });
  };

  render() {
    return (
      <TeamNumberContext.Provider value={{ teamNumber: this.props.teamNumber }}>
        <Layout className="top-layer">
          <Content className="body-layer" style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Tabs
                defaultActiveKey="getTokens"
                onChange={this.handleTabChange}
              >
                <TabPane tab="Get Tokens" key="getTokens">
                  <GetToken />
                </TabPane>
                <TabPane tab="List of Tokens" key="listOfTokens">
                  <ListToken ref="listTokenPage" />
                </TabPane>
                <TabPane tab="Generate Tokens" key="generateTokens">
                  <AddToken />
                </TabPane>
              </Tabs>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Made by Ben Chong 2020
          </Footer>
        </Layout>
      </TeamNumberContext.Provider>
    );
  }
}

export default App;
