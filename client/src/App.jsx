import { Layout, Menu, Typography, Button, Modal } from 'antd';
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
const { Text } = Typography;
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
    return (
      <li key={token._id} className="list__item product">
        <h3 className="product__name">{token.value}</h3>
        <p className="product__description">{token.status}</p>
        <p className="product__description">{token.timeStamp}</p>
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
            <GetToken getToken={this.getReadyToken} token={currentToken} />
            <Button onClick={this.insertTokens}>haha</Button>
            <ul className="list">
              {tokens && tokens.length > 0 ? (
                tokens.map((token) => this.renderToken(token))
              ) : (
                <p>No products found</p>
              )}
            </ul>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made by Ben Chong 2020</Footer>
      </Layout>
    );
  }
}

export default App;
