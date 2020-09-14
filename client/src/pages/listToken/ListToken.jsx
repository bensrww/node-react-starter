import React, { Component } from 'react';
import { Row, Col, Typography, Button, Modal, Spin } from 'antd';
import { tokenStatus } from '../../constants';
import './ListToken.css';
import {
  updateToken,
  getAllTokens,
  displayLocalTime,
} from '../../utils/helpers';
import { TeamNumberContext } from '../../TeamNumberContext';

const { Text, Paragraph } = Typography;

export default class ListToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      spinning: true,
    };
  }

  componentDidMount() {
    this.refreshTokens();
  }

  refreshTokens = () => {
    this.setState({ spinning: true });
    const resp = getAllTokens(this.context.teamNumber);
    resp.then((value) => {
      this.setState({ tokens: value, spinning: false });
    });
  };

  updateTokenStatus = async (id, status) => {
    const { teamNumber } = this.context;
    try {
      this.setState({ spinning: true });
      const updateResp = await updateToken(id, status, teamNumber);
      const allTokensResp = await getAllTokens(teamNumber);
      this.setState({ tokens: allTokensResp, spinning: false });
    } catch (err) {
      Modal.error({
        title: 'Error',
        content: err,
      });
    }
  };

  replaceAt = (string, index, replace) => {
    return string.substring(0, index) + replace + string.substring(index + 1);
  };

  maskValue = (value) => {
    return this.replaceAt(value, 2, '*');
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
            >
              <Text className="list-token-text" mark>
                {this.maskValue(token.value)} Sequence: {token.sequence}
              </Text>{' '}
              <div className="token-extra-info">
                {token.status} {displayLocalTime(token.timeStamp)} HKT
              </div>
            </Paragraph>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 12 }}>
            <Button
              className="list-button first button-confirm"
              size="small"
              icon="check"
              disabled={true}
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
              disabled={true}
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
    const { tokens, spinning } = this.state;
    console.log('listTokenContext', this.context);
    return (
      <Spin spinning={spinning}>
        <ul className="token-list">
          {tokens && tokens.length > 0 ? (
            tokens.map((token) => this.renderToken(token))
          ) : (
            <p>No products found</p>
          )}
        </ul>
      </Spin>
    );
  }
}

ListToken.contextType = TeamNumberContext;
