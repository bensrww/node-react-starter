import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Typography, Tooltip } from 'antd';
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
    };
  }

  getReadyToken = async () => {
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
  };

  updateAndGetNewToken = () => {
    const { _id } = this.state;
    updateToken(_id, tokenStatus.INVALID);
    getReadyToken();
  };

  ResponseButtons = () => {
    const { _id } = this.state;
    return (
      <>
        <Col span={{ xs: 24, sm: 12 }}>
          <Tooltip title="Thanks for your feedback!" trigger="click">
            <Button
              type="primary"
              className="token-button button-confirm"
              onClick={() => updateToken(_id, tokenStatus.USED)}
            >
              This token works!
            </Button>
          </Tooltip>
        </Col>
        <Col span={{ xs: 24, sm: 12 }}>
          <Button
            onClick={() => this.updateAndGetNewToken}
            className="token-button button-error"
          >
            This token doesn't work...
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
      >
        Get Token
      </Button>
    </Col>
  );

  render() {
    const { token } = this.state;
    const { _id, value, timeStamp } = token;
    return (
      <div>
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
      </div>
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
