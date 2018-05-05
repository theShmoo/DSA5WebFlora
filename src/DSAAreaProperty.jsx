import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class DSAAreaProperty extends Component {
  render()
  {
    const {title, areas} = this.props;
    const items = areas.map((g, i) => {
        return <li key={i}>{g}</li>
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
