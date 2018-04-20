import React, { Component } from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class DSAFlora extends Component {

  getGebiete() {
    const {flora} = this.props;
    const items = flora.Gebiete.map((f, i) => {
          return <ListGroupItem key={i}>{f}</ListGroupItem>
        });
    return (
      <Panel>
        <Panel.Heading><Panel.Title toggle>Gebiete</Panel.Title></Panel.Heading>
        <Panel.Collapse>
          <ListGroup>
            {items}
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  }

  getSchwierigkeit() {
    const {flora} = this.props;
    const items = Object.keys(flora.Schwierigkeit).map((f, i) => {
          return <ListGroupItem key={i}>{f}: <strong>{flora.Schwierigkeit[f]}</strong></ListGroupItem>
        });
    return (
      <Panel>
        <Panel.Heading><Panel.Title toggle>Umgebung</Panel.Title></Panel.Heading>
        <Panel.Collapse>
          <ListGroup>
            {items}
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  }

  render() {
    const {flora} = this.props;
    const {Name, Seite} = flora;
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            {Name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <ListGroup>
            <ListGroupItem header="Seite">{Seite}</ListGroupItem>
            {this.getGebiete()}
            {this.getSchwierigkeit()}
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  }
}
