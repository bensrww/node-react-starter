import { Layout, Menu, Typography, Button } from 'antd';
import React from 'react';
import { GetToken } from './pages';
import './App.css';
import tokens from './mockData/tokens';
import { tokenStatusEnum } from './constants';
import _ from 'lodash';
import productService from './services/productService';

const { READY, USED, INVALID, PENDING } = tokenStatusEnum;
const { Header, Content, Footer } = Layout;
const { Text } = Typography;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens,
      currentToken: null,
      products: null,
    };
    this.getProducts();
  }

  getProducts = async () => {
    let res = await productService.getAll();
    console.log(res);
    this.setState({ products: res });
  };

  insertProducts = async () => {
    let res = await productService.insertOneProduct();
  };

  renderProduct = (product) => {
    return (
      <li key={product._id} className="list__item product">
        <h3 className="product__name">{product.name}</h3>
        <p className="product__description">{product.description}</p>
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
    const { currentToken, products } = this.state;
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
            <Button onClick={this.insertProducts}>haha</Button>
            <ul className="list">
              {products && products.length > 0 ? (
                products.map((product) => this.renderProduct(product))
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
