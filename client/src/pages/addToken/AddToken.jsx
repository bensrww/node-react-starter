import React, { Component } from 'react';
import { Button, Input, Form, Modal, Spin, Row, Col } from 'antd';
import tokenService from '../../services/tokenService';

export class AddToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinning: false,
    };
  }

  handleInsertToken = async () => {
    this.setState({
      spinning: true,
    });
    const { form } = this.props;
    const { getFieldValue } = form;
    console.log('form', form);
    await tokenService.insertTokens(getFieldValue('tokenValue'));
    this.setState({
      spinning: false,
    });
  };

  deleteAllTokens = () => {
    Modal.warning({
      title: 'Are you sure?',
      onOk: tokenService.deleteAllTokens,
    });
  };

  render() {
    const { insertTokens, form } = this.props;
    const { spinning } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Spin spinning={spinning}>
          <Form.Item>
            {getFieldDecorator('tokenValue')(<Input.TextArea rows={8} />)}
          </Form.Item>
          <Row gutter={[0, 24]}>
            <Col>
              <Button type="primary" onClick={this.handleInsertToken}>
                Insert Tokens
              </Button>
            </Col>
            <Col>
              <Button type="danger" onClick={this.deleteAllTokens}>
                Delete All Tokens
              </Button>
            </Col>
          </Row>
        </Spin>
      </Form>
    );
  }
}

export default Form.create()(AddToken);
