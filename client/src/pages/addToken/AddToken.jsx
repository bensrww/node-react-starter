import React, { Component } from 'react';
import { Button, Input, Form, Modal, Spin, Row, Col, Typography } from 'antd';
import tokenService from '../../services/tokenService';
import './AddToken.css';
import { TeamNumberContext } from '../../TeamNumberContext';

const { Text } = Typography;

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
    const { teamNumber } = this.context;
    console.log('form', form);
    await tokenService.insertTokens(getFieldValue('tokenValue'), teamNumber);
    this.setState({
      spinning: false,
    });
  };

  deleteAllTokens = () => {
    Modal.warning({
      title: 'Are you sure?',
      onOk: () => tokenService.deleteAllTokens(this.context.teamNumber),
    });
  };

  renderNumbers = () => {
    const {
      form: { getFieldValue },
    } = this.props;
    const fieldVal = getFieldValue('tokenValue');
    if (!fieldVal) return <Text>Input tokens, then press Insert Tokens</Text>;
    const splitText = fieldVal.match(/.{1,6}/g);
    return splitText.map((val) => <Text>{val}</Text>);
  };

  render() {
    const { form } = this.props;
    const { spinning } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <Spin spinning={spinning}>
          <Text strong className="top-note">
            To insert multiple tokens, separate them by a line-break char (e.g
            pressing "enter")
          </Text>
          <span>{this.renderNumbers()}</span>
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

AddToken.contextType = TeamNumberContext;
