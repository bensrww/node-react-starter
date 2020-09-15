import React, { Component } from 'react';
import { Button, Input, Form, Modal, Spin, Row, Col, Typography } from 'antd';
import tokenService from '../../services/tokenService';
import './AddToken.css';
import { TeamNumberContext } from '../../TeamNumberContext';

const { Text } = Typography;

let id = 1;

export class AddToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinning: false,
    };
  }

  handleInsertToken = async () => {
    this.setState({ spinning: true });
    const {
      form: { validateFields },
    } = this.props;

    validateFields(['tokenValues'], async (err, values) => {
      if (!err) {
        const { teamNumber } = this.context;
        let mergedString = '';
        values.tokenValues.forEach((val) => {
          mergedString = mergedString.concat('', val);
        });

        const hasNonNumericalErr = !/^\d+$/.test(mergedString);
        if (hasNonNumericalErr)
          console.log('Passcode contains non-numerical value(s)');
        await tokenService.insertTokens(mergedString, teamNumber);
      }
      this.setState({ spinning: false });
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
    const fieldVal = getFieldValue('tokenValues');
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

  removeTextBox = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key) => key !== k),
    });
  };

  addTextBox = () => {
    const { form } = this.props;
    // can use data-binding to get

    const { keys, tokenValues } = form.getFieldsValue(['keys', 'tokenValues']);
    console.log('keys: ', keys, 'tokens: ', tokenValues);
    if (keys.length === tokenValues.length) {
      // prevent adding more than one textbox for unknown reasons
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }
  };

  InputBox = () => {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const keys = getFieldValue('keys');

    return keys.map((k) => (
      <Form.Item>
        {getFieldDecorator(`tokenValues[${k}]`, {
          rules: [
            { required: true, message: 'Please input passcode!' },
            {
              validator: (rule, value, callback) => {
                const tokenValues = getFieldValue(`tokenValues[${k}]`);
                const hasRemainderErr = tokenValues.length % 6 !== 0;
                if (hasRemainderErr)
                  callback('Each passcode has exactly 6 digits, please verify');
                callback();
              },
            },
          ],
        })(<Input />)}
      </Form.Item>
    ));
  };

  render() {
    const { form } = this.props;
    const { spinning } = this.state;
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form;
    getFieldDecorator('keys', { initialValue: [0] });

    const tokenValues = getFieldValue('tokenValues');
    const lastTokenValue =
      Array.isArray(tokenValues) && tokenValues[tokenValues.length - 1];
    console.log('lastTokenValue', lastTokenValue);

    if (lastTokenValue && lastTokenValue.length === 6) this.addTextBox();

    return (
      <Form>
        <Spin spinning={spinning}>
          <Text strong className="top-note">
            To insert multiple tokens, please <Text type="danger">don't</Text>{' '}
            type enter, just type 123456654321 to insert 2 tokens, for example
          </Text>
          {/* <span>{this.renderNumbers()}</span> */}
          <this.InputBox />

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
