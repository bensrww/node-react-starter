import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import tokenService from '../../services/tokenService';

export class AddToken extends Component {
  handleInsertToken = () => {
    const { form } = this.props;
    const { getFieldValue } = form;
    console.log('form', form);
    tokenService.insertTokens(getFieldValue('tokenValue'));
  };

  deleteAllTokens = () => {
    tokenService.deleteAllTokens();
  };

  render() {
    const { insertTokens, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Form.Item>{getFieldDecorator('tokenValue')(<Input />)}</Form.Item>
        <Button onClick={this.handleInsertToken}>Insert Tokens</Button>
        <Button type="danger" onClick={this.deleteAllTokens}>
          Delete All Tokens
        </Button>
      </Form>
    );
  }
}

export default Form.create()(AddToken);
