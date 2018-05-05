import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';
import DSAMonth from './DSAMonth';

export default class DSASearchProperty extends Component {

  render() {
    const {crop, title} = this.props;
    const items = Object.keys(crop).map((f, i) => {
      return (
        <li key={i}>
          <strong>{f}: </strong>
          <DSAMonth months={crop[f]} />
        </li>
      );
    });
    return <ListGroupItem>
      <strong>{title}</strong>
      <ul>
        {items}
      </ul>
    </ListGroupItem>
  }
}
