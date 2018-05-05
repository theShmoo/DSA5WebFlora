import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class DSAPublicationProperty extends Component {

  render() {
    const {publications, title} = this.props;
    const items = Object.keys(publications).map((f) => {
      const value = publications[f];
      if(value === parseInt(value, 10))
        return <span><strong>{f} </strong> Seite {value}</span>;
      else
        return <a title={f} target="_blank" href={value}>{f}</a>;
    }).map((f, i) => {
      return <li key={i}>{f}</li>
    });
    return <ListGroupItem>
      <strong>{title} </strong>
      <ul>
        {items}
      </ul>
    </ListGroupItem>
  }
}
