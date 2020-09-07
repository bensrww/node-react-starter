import React, { Component } from 'react';
import { Row, Col, Typography, Button, Modal } from 'antd';
import { tokenStatus } from '../../constants';
import './ListToken.css';
import { updateToken, getAllTokens } from '../../utils/helpers';

const { Text, Paragraph } = Typography;

export default class ListToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
    };
  }

  componentDidMount() {
    const resp = getAllTokens();
    resp.then((value) => {
      this.setState({ tokens: value });
    });
  }

  componentDidUpdate() {
    const resp = getAllTokens();
    resp.then((value) => {
      this.setState({ tokens: value });
    });
  }

  updateTokenStatus = async (id, status) => {
    try {
      const updateResp = await updateToken(id, tokenStatus.USED);
      const allTokensResp = await getAllTokens();
      this.setState({ tokens: allTokensResp });
    } catch (err) {
      Modal.error({
        title: 'Error',
        content: err,
      });
    }
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
              onClick={() =>
                this.updateTokenStatus(token._id, tokenStatus.USED)
              }
            >
              Token OK
            </Button>
            <Button
              className="list-button button-error"
              size="small"
              icon="close"
              disabled={isTokenReady}
              onClick={() =>
                this.updateTokenStatus(token._id, tokenStatus.INVALID)
              }
            >
              Token Invalid
            </Button>
          </Col>
        </Row>
      </li>
    );
  };

  render() {
    const { tokens } = this.state;
    return (
      <ul className="token-list">
        {tokens && tokens.length > 0 ? (
          tokens.map((token) => this.renderToken(token))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    );
  }
}
