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
import { tokenStatus, TEAM_NUMBER } from './constants';
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
      activeTabKey: 'getTokens',
    };

    this.setBackgroundClassName();
  }

  backgroundClassName = '';

  setBackgroundClassName = () => {
    switch (this.props.teamNumber) {
      case TEAM_NUMBER.TEAM_1:
        this.backgroundClassName = 't1-background';
        break;
      case TEAM_NUMBER.TEAM_2:
        this.backgroundClassName = 't2-background';
        break;
      case TEAM_NUMBER.TEAM_3:
        this.backgroundClassName = 't3-background';
        break;

      default:
        break;
    }
  };

  handleTabChange = (activeKey) => {
    if (activeKey === 'listOfTokens') {
      if (this.refs.listTokenPage) this.refs.listTokenPage.refreshTokens();
      Modal.confirm({
        title: 'Debug page',
        content: 'Please go to Get Tokens page to get token',
        onOk: () => {
          this.setState({ activeTabKey: 'getTokens' });
        },
        onCancel: () => {},
      });
    } else if (activeKey === 'getTokens' && this.refs.getTokenPage) {
      this.refs.getTokenPage.refreshNumberOfTokens();
    }

    this.setState({ activeTabKey: activeKey });
  };

  handleTeamChange = (e) => {
    this.setState({ team: e.target.value });
  };

  render() {
    return (
      <TeamNumberContext.Provider value={{ teamNumber: this.props.teamNumber }}>
        <Layout className={`top-layer ${this.backgroundClassName}`}>
          <Content className="body-layer" style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Tabs
                onChange={this.handleTabChange}
                tabPosition="top"
                activeKey={this.state.activeTabKey}
              >
                <TabPane tab="Get Tokens" key="getTokens">
                  <GetToken ref="getTokenPage" />
                </TabPane>
                <TabPane tab="Generate Tokens" key="generateTokens">
                  <AddToken />
                </TabPane>
                <TabPane tab="List of Tokens" key="listOfTokens">
                  <ListToken ref="listTokenPage" />
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
