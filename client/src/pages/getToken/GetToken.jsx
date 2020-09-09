import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Typography, Tooltip, Spin } from 'antd';
import './GetToken.css';
import _ from 'lodash';
import { tokenStatus } from '../../constants';
import { updateToken, getReadyToken } from '../../utils/helpers';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

const { Text } = Typography;

class GetToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: {
        _id: null,
        value: null,
        timeStamp: null,
      },
      spinning: false,
    };
  }

  getReadyToken = async () => {
    this.setState({ spinning: true });
    const resp = await getReadyToken();
    console.log('getReadyToken resp', resp);
    if (resp && resp.currentToken) {
      const { _id, timeStamp, value } = resp.currentToken;
      this.setState({
        token: {
          _id,
          timeStamp,
          value,
        },
      });
    }
    this.setState({ spinning: false });
  };

  updateAndGetNewToken = async () => {
    this.setState({ spinning: true });
    const { _id } = this.state.token;
    await updateToken(_id, tokenStatus.INVALID);
    await this.getReadyToken();
    this.setState({ spinning: false });
  };

  updateTokenStatus = async (id, status) => {
    this.setState({ spinning: true });
    await updateToken(id, status);
    this.setState({ spinning: false });
  };

  ResponseButtons = () => {
    const { _id } = this.state.token;
    return (
      <>
        <Col span={{ xs: 24, sm: 12 }}>
          <Tooltip title="Thanks for your feedback!" trigger="click">
            <Button
              type="primary"
              className="token-button button-confirm"
              onClick={() => this.updateTokenStatus(_id, tokenStatus.USED)}
            >
              <span className="token-button-text">This token works!</span>
            </Button>
          </Tooltip>
        </Col>
        <Col span={{ xs: 24, sm: 12 }}>
          <Button
            onClick={() => this.updateAndGetNewToken()}
            className="token-button button-error"
          >
            <span className="token-button-text">
              This token doesn't work, click to get a new one!
            </span>
          </Button>
        </Col>
      </>
    );
  };

  InitialGetButton = () => (
    <Col span={{ md: 12 }}>
      <Button
        type="primary"
        className="token-button"
        onClick={this.getReadyToken}
        style={{ height: '80px' }}
      >
        Get Token
      </Button>
    </Col>
  );

  render() {
    const { token, spinning } = this.state;
    const { _id, value, timeStamp } = token;
    return (
      <Spin spinning={spinning}>
        <Row>
          <Col className="get-token-text" span={24}>
            {!_.isEmpty(value) ? <Text copyable>{value}</Text> : 'No tokens'}
          </Col>
        </Row>
        <Row style={{ margin: 0 }} justify="center" gutter={[24, 24]}>
          {!_.isEmpty(value) ? (
            <>
              <Text type="secondary">
                This token was generated at {timeStamp}
              </Text>
              <this.ResponseButtons />
            </>
          ) : (
            <this.InitialGetButton />
          )}
        </Row>
      </Spin>
    );
  }
}

export default GetToken;
GetToken.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func,
  updateToken: PropTypes.func,
};
GetToken.defaultProps = {
  token: null,
  getToken: null,
  updateToken: null,
};
