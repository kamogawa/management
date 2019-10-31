import React from 'react';
import { Button } from '@material-ui/core';

class CustomerDelete extends React.Component {

  deletedCustomer(id) {
    const url = `/api/customers/${id}`;
    fetch(url, {
      method: 'DELETE'
    });
    this.props.stateRefresh();
  }


  render() {
    return (
      <Button onClick={(e) => {this.deletedCustomer(this.props.id)}} >
        削除
      </Button>
    )
  }

}

export default CustomerDelete;