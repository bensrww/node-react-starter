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
import { GetToken } from './pages';
import './App.css';
import mockTokens from './mockData/tokens';
import { tokenStatus } from './constants';
import _ from 'lodash';
import tokenService from './services/tokenService';
import { getSafe } from './utils/helpers';
import AddToken from './pages/addToken/AddToken';

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
    this.getAllTokens();
  }

  updateToken = (id, status) => {
    console.log('update token', id, status);
  };

  displayErrModal = (msg) => {
    Modal.error({
      title: 'Error',
      content: msg,
    });
  };

  getAllTokens = async () => {
    let res = await tokenService.getTokens();
    console.log(res);
    this.setState({ tokens: res });
  };

  getReadyToken = async () => {
    try {
      const res = await tokenService.getOneReadyToken();
      console.log('Get ready token ok', res);
      if (getSafe(() => res.data.value, null))
        this.setState({ currentToken: res.data });
    } catch (err) {
      this.displayErrModal(err.response.data.errorMsg);
    }
  };

  insertTokens = async () => {
    const randomNum = Math.floor(Math.random() * 899999 + 100000).toString(10);
    await tokenService.insertTokens(randomNum);
    this.getAllTokens();
  };

  renderToken = (token) => {
    let className = '';
    const isTokenReady = token.status !== tokenStatus.READY;
    if (isTokenReady) className = 'cross-text';
    return (
      <li className="token-list-li" key={token._id}>
        <Row>
          <Col sm={{ span: 24 }} md={{ span: 12 }}>
            <Paragraph
              style={{ display: 'inline-block', margin: 0 }}
              className={`${className} list-copy-icon`}
              copyable={isTokenReady ? false : { text: token.value }}
            >
              <Text mark>{token.value}</Text> {token.status} {token.timeStamp}
            </Paragraph>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 12 }}>
            <Button
              className="list-button first button-confirm"
              size="small"
              icon="check"
              disabled={isTokenReady}
            >
              Token OK
            </Button>
            <Button
              className="list-button button-error"
              size="small"
              icon="close"
              disabled={isTokenReady}
            >
              Token Invalid
            </Button>
          </Col>
        </Row>
      </li>
    );
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
                <GetToken
                  updateToken={this.updateToken}
                  getToken={this.getReadyToken}
                  token={currentToken}
                />
              </TabPane>
              <TabPane tab="List of Tokens" key="listOfTokens">
                <ul className="token-list">
                  {tokens && tokens.length > 0 ? (
                    tokens.map((token) => this.renderToken(token))
                  ) : (
                    <p>No products found</p>
                  )}
                </ul>
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
