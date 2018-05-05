import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class DSASearchProperty extends Component {

  render() {
    const {title, searches} = this.props;
    const items = Object.keys(searches).map((f, i) => {
        return <li key={i}>{f}: <strong>{searches[f]}</strong></li>
      });
    return (
      <ListGroupItem>
        <strong>{title}</strong>
          <ul>
            {items}
          </ul>
      </ListGroupItem>
    );
  }
}
