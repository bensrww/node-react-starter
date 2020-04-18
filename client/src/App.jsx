import { Layout, Menu, Typography, Button, Modal, Tabs, Icon } from 'antd';
import React from 'react';
import { GetToken } from './pages';
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
      currentToken: null,
    };
    this.getAllTokens();
  }

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
        this.setState({ currentToken: res.data.value });
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
    if (token.status !== tokenStatus.READY) className = 'cross-text';
    return (
      <li key={token._id}>
        <Paragraph
          style={{ display: 'inline-block' }}
          className={`${className} list-copy-icon`}
          copyable={{ text: token.value }}
        >
          <Text mark>{token.value}</Text> {token.status} {token.timeStamp}
        </Paragraph>
        <Button
          className="list-button-first button-confirm"
          size="small"
          shape="circle"
          icon="check"
        />
        <Button
          className="list-button button-error"
          size="small"
          shape="circle"
          icon="close"
        />
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
                <GetToken getToken={this.getReadyToken} token={currentToken} />
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
                <Button onClick={this.insertTokens}>haha</Button>
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
