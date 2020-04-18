import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Typography } from 'antd';
import _ from 'lodash';
import { tokenStatus } from '../../constants';

const { Text } = Typography;

const GetToken = (props) => {
  const { token, getToken, updateToken } = props;
  const { _id, value, timeStamp } = token;

  const updateAndGetNewToken = () => {
    updateToken(_id, tokenStatus.INVALID);
    getToken();
  };

  const ResponseButtons = () => (
    <>
      <Col span={{ xs: 24, sm: 12 }}>
        <Button
          type="primary"
          className="token-button button-confirm"
          onClick={updateToken(_id, tokenStatus.USED)}
        >
          This token works!
        </Button>
      </Col>
      <Col span={{ xs: 24, sm: 12 }}>
        <Button
          onClick={updateAndGetNewToken}
          className="token-button button-error"
        >
          This token doesn't work...
        </Button>
      </Col>
    </>
  );

  const InitialGetButton = () => (
    <Col span={{ md: 12 }}>
      <Button type="primary" className="token-button" onClick={getToken}>
        Get Token
      </Button>
    </Col>
  );

  return (
    <div>
      <Row>
        <Col className="get-token-text" span={24}>
          {!_.isEmpty(token) ? <Text copyable>{value}</Text> : 'No tokens'}
        </Col>
      </Row>
      <Row style={{ margin: 0 }} justify="center" gutter={[24, 24]}>
        {!_.isEmpty(token) ? (
          <>
            <Text type="secondary">
              This token was generated at {timeStamp}
            </Text>
            <ResponseButtons />
          </>
        ) : (
          <InitialGetButton />
        )}
      </Row>
    </div>
  );
};

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
