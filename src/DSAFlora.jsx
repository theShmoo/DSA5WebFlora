import React, { Component } from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import {DSAMonths} from './DSAUtils.jsx';

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

  renderMonths(months) {
    return months.map((id) => {
        return <span><strong>{DSAMonths[id].normal}</strong> </span>;
    })
  }

  getErnte() {
    const {flora} = this.props;
    const items = Object.keys(flora.Ernte).map((f, i) => {
          return (
            <ListGroupItem key={i}>{f}: <strong>{this.renderMonths(flora.Ernte[f])}</strong></ListGroupItem>
          )
        });
    return (
      <Panel>
        <Panel.Heading><Panel.Title toggle>Ernte</Panel.Title></Panel.Heading>
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
            {this.getGebiete()}
            {this.getSchwierigkeit()}
            {this.getErnte()}
            <ListGroupItem><strong>Seite:</strong> {Seite}</ListGroupItem>
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  }
}
