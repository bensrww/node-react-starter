import { Layout, Menu, Typography, Button } from 'antd';
import React from 'react';
import { GetToken } from './pages';
import './App.css';
import mockTokens from './mockData/tokens';
import { tokenStatus } from './constants';
import _ from 'lodash';
import tokenService from './services/tokenService';

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

  getAllTokens = async () => {
    let res = await tokenService.getOneReadyToken();
    console.log(res);
    this.setState({ tokens: res });
  };

  getReadyToken = async () => {
    let res = await tokenService.getOneReadyToken();
    console.log(res);
    this.setState({ oneToken: res });
  };

  insertTokens = async () => {
    const randomNum = Math.floor(Math.random() * 999999 + 1).toString(10);
    let res = await tokenService.insertTokens(randomNum);
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

  genReadyToken = () => {
    const { tokens } = this.state;
    const readyTokenObjs = tokens.filter((value) => {
      return value.status === READY;
    });
    const currentToken = !_.isEmpty(readyTokenObjs)
      ? readyTokenObjs[0].tokenValue
      : null;
    this.setState({
      currentToken,
    });
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
            <GetToken getToken={this.genReadyToken} token={currentToken} />
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
