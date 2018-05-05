import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class DSATextProperty extends Component {
  render()
  {
    const {title, text} = this.props;
    if(!text) return "";
    else
      return (
        <ListGroupItem>
          <strong>{title}</strong>: {text}
        </ListGroupItem>
      );
  }
}
