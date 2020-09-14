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
    const {
      form: { validateFields },
    } = this.props;

    validateFields(['tokenValue'], async (err, values) => {
      if (!err) {
        const { teamNumber } = this.context;
        await tokenService.insertTokens(values.tokenValue, teamNumber);
      }
      this.setState({
        spinning: false,
      });
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
    const colSpan = {
      xs: 8,
      md: 4,
      xl: 2,
    };

    return (
      <Row gutter={[16, 32]}>
        {splitText.map((val) => {
          const isValueError = !(val.length === 6 && /^\d+$/.test(val)); // latter one checks if string only contains numbers
          const textClassName = `token-text ${
            isValueError ? 'token-text-err' : ''
          }`;
          return (
            <Col className="token-col" {...colSpan}>
              <Text className={textClassName} strong>
                {val}
              </Text>
            </Col>
          );
        })}
      </Row>
    );
  };

  render() {
    const { form } = this.props;
    const { spinning } = this.state;
    const { getFieldDecorator, getFieldValue } = form;
    return (
      <Form>
        <Spin spinning={spinning}>
          <Text strong className="top-note">
            To insert multiple tokens, separate them by a line-break char (e.g
            pressing "enter")
          </Text>
          <span>{this.renderNumbers()}</span>
          <Form.Item>
            {getFieldDecorator('tokenValue', {
              rules: [
                { required: true, message: 'Please input passcode!' },
                {
                  validator: (rule, value, callback) => {
                    const tokenValue = getFieldValue('tokenValue');
                    const hasNonNumericalErr = !/^\d+$/.test(tokenValue);
                    const hasRemainderErr = tokenValue.length % 6 !== 0;
                    if (hasNonNumericalErr)
                      callback('Passcode contains non-numerical value(s)');
                    else if (hasRemainderErr)
                      callback(
                        'Each passcode has exactly 6 digits, please verify',
                      );
                    callback();
                  },
                },
              ],
            })(<Input.TextArea rows={8} />)}
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
