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
      teamNumber: null,
      visible: true,
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
    this.setState({ teamNumber: e.target.value });
  };

  initSetTeam = (teamNumber) => {
    this.setState({
      teamNumber,
      visible: false,
    });
  };

  render() {
    const { teamNumber } = this.state;
    return (
      <TeamNumberContext.Provider value={{ teamNumber }}>
        <Modal title="Choose Team" visible={this.state.visible}>
          <Button onClick={() => this.initSetTeam(TEAM_NUMBER.TEAM_2)}>
            T2
          </Button>
          <Button onClick={() => this.initSetTeam(TEAM_NUMBER.TEAM_3)}>
            T3
          </Button>
        </Modal>
        <Layout className="top-layer">
          <Radio.Group onChange={this.handleTeamChange} value={teamNumber}>
            <Radio.Button value={2}>T2</Radio.Button>
            <Radio.Button value={3}>T3</Radio.Button>
          </Radio.Group>
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
                  <AddToken insertTokens={this.insertTokens} />
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
