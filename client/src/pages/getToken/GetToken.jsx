import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

const InitialGetButton = ({ getToken }) => (
  <Col span={{ md: 12 }}>
    <Button type="primary" className="token-button" onClick={getToken}>
      Get Token
    </Button>
  </Col>
);
InitialGetButton.propTypes = {
  getToken: PropTypes.func,
};
InitialGetButton.defaultProps = {
  getToken: null,
};

const ResponseButtons = ({ getToken }) => (
  <>
    <Col span={{ xs: 24, sm: 12 }}>
      <Button type="primary" className="token-button" onClick={getToken}>
        YES, IT IS!
      </Button>
    </Col>
    <Col span={{ xs: 24, sm: 12 }}>
      <Button onClick={getToken} className="token-button">
        NO, SO SAD!
      </Button>
    </Col>
  </>
);
ResponseButtons.propTypes = {
  getToken: PropTypes.func,
};
ResponseButtons.defaultProps = {
  getToken: null,
};

const GetToken = (props) => {
  const { token, getToken } = props;
  return (
    <div>
      <Row>
        <Col span={24}>
          {token ? <Text copyable>{token}</Text> : 'No tokens'}
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]}>
        {token ? (
          <ResponseButtons getToken={getToken} />
        ) : (
          <InitialGetButton getToken={getToken} />
        )}
      </Row>
    </div>
  );
};

export default GetToken;
GetToken.propTypes = {
  token: PropTypes.string,
  getToken: PropTypes.func,
};
GetToken.defaultProps = {
  token: null,
  getToken: null,
};
