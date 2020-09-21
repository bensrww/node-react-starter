import React, { Component } from 'react';
import {
  Button,
  Input,
  Form,
  Modal,
  Spin,
  Row,
  Col,
  Typography,
  notification,
} from 'antd';
import tokenService from '../../services/tokenService';
import './AddToken.css';
import { TeamNumberContext } from '../../TeamNumberContext';

const { Text } = Typography;

let id = 1;

export class AddToken extends Component {
  passcodeInput = [];
  idToBeAdded = 0;
  hasBeenAutoFocused = true; // for auto focusing

  constructor(props) {
    super(props);

    this.state = {
      spinning: false,
    };
  }

  resetFields = () => {
    const {
      form: { resetFields },
    } = this.props;
    resetFields();
    this.passcodeInput = [];
    this.idToBeAdded = 0;
    this.hasBeenAutoFocused = true;
    id = 1;
  };

  handleInsertToken = async () => {
    this.setState({ spinning: true });
    const {
      form: { validateFields, getFieldValue },
    } = this.props;
    console.log('handleInsertToken', getFieldValue('tokenValues'));

    validateFields(['tokenValues'], async (err, values) => {
      console.log('validateFields', err, values);
      if (!err) {
        const { teamNumber } = this.context;
        let mergedString = '';
        values.tokenValues.forEach((val) => {
          if (val) mergedString = mergedString.concat('', val);
        });

        await tokenService.insertTokens(mergedString, teamNumber);
      } else {
        Modal.error({
          title: 'Error',
          content: 'Some token values may have been incorrect',
        });
      }
      this.setState({ spinning: false });
    });

    this.resetFields();
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
    console.log(
      'keys: ',
      keys,
      'tokens: ',
      tokenValues,
      'refs: ',
      this.passcodeInput,
    );
    if (keys.length === tokenValues.length) {
      // prevent adding more than one textbox for unknown reasons
      this.idToBeAdded = keys.length;
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
      this.hasBeenAutoFocused = true;
    } else {
      this.hasBeenAutoFocused = false;
    }
  };

  InputBox = () => {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const keys = getFieldValue('keys');
    const colSpan = {
      xs: 8,
      md: 4,
      xl: 2,
    };
    return (
      <Row>
        {keys.map((k) => (
          <Col {...colSpan}>
            <Form.Item>
              {getFieldDecorator(`tokenValues[${k}]`, {
                rules: [
                  { required: k === 0, message: 'Please input passcode!' },
                  {
                    validator: (rule, value, callback) => {
                      const tokenValues = getFieldValue(`tokenValues[${k}]`);
                      if (tokenValues === undefined || tokenValues === '')
                        callback();
                      else {
                        const hasRemainderErr = tokenValues.length % 6 !== 0;
                        const hasNonNumericalErr = !/^\d+$/.test(tokenValues);
                        if (hasNonNumericalErr) callback(' ');
                        if (hasRemainderErr) callback(' ');
                        callback();
                      }
                    },
                  },
                ],
              })(
                <Input
                  ref={(input) => {
                    this.passcodeInput[k] = input;
                  }}
                  className="input-box"
                />,
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    );
  };

  render() {
    const { form } = this.props;
    const { spinning } = this.state;
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form;
    getFieldDecorator('keys', { initialValue: [0] });

    const tokenValues = getFieldValue('tokenValues');
    const lastTokenValue =
      Array.isArray(tokenValues) && tokenValues[tokenValues.length - 1];
    console.log(
      'lastTokenValue',
      lastTokenValue,
      'hasBeenAutoFocused',
      this.hasBeenAutoFocused,
      'passcodeInput',
      this.passcodeInput,
      'idToBeAdded',
      this.idToBeAdded,
    );

    if (lastTokenValue && lastTokenValue.length === 6) this.addTextBox();
    if (!this.hasBeenAutoFocused) {
      if (this.passcodeInput[this.idToBeAdded] && !this.hasBeenAutoFocused) {
        console.log('auto focus', this.passcodeInput[this.idToBeAdded]);
        this.passcodeInput[this.idToBeAdded].focus();
        this.hasBeenAutoFocused = true;
      }
    }
    return (
      <Form>
        <Spin spinning={spinning}>
          <Text strong className="top-note">
            ↓ Start here
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
