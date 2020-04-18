import React, { Component } from 'react';
import { Button } from 'antd';

export class AddToken extends Component {
  render() {
    const { insertTokens } = this.props;
    return (
      <div>
        <Button onClick={insertTokens}>haha</Button>
      </div>
    );
  }
}

export default AddToken;
