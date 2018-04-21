import React, { Component } from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import {DSAMonths} from './DSAUtils.jsx';
import DSAMonthTooltip from './DSAMonthTooltip.jsx'

export default class DSAFlora extends Component {

  getGebiete() {
    const {flora} = this.props;
    const items = flora.Gebiete.map((f, i) => {
          return <li key={i}>{f}</li>
        });
    return (
      <ListGroupItem>
        <strong>Gebiete: </strong>
          <ul>
            {items}
          </ul>
      </ListGroupItem>
    );
  }

  getSchwierigkeit() {
    const {flora} = this.props;
    const items = Object.keys(flora.Schwierigkeit).map((f, i) => {
          return <li key={i}>{f}: <strong>{flora.Schwierigkeit[f]}</strong></li>
        });
    return (
      <ListGroupItem>
        <strong>Umgebung: </strong>
          <ul>
            {items}
          </ul>
      </ListGroupItem>
    );
  }

  renderMonthWithTooltip(month) {
    return <DSAMonthTooltip month={month}><span>{DSAMonths[month].normal}</span></DSAMonthTooltip>
  }

  renderMonths(months) {
    // months should be integers
    // sort them:
    let sorted = months.sort((a, b) => a-b);
    const max = sorted.length - 1;
    const ids = sorted.filter((m, i, array) => {
      // if the index is 0 look at the other side of the array
      const id_before = i < 1 ? max : i - 1;
      const id_after = i >= max ? 0 : i + 1;
      const val_before = m < 1 ? 12 : m - 1;
      const val_after = m >= 12 ? 0 : m + 1;
      return array[id_before] === val_before && array[id_after] === val_after;
    });

    if(ids.length === DSAMonths.length) return <li>ganzjährig</li>;

    /// to replace:
    const to_replace = ids.map((i) => sorted.indexOf(i))
    let fin = sorted.map((m, i, array) => {
      if (to_replace.includes(i))
        return "-"
      else
       return m;
    })
    // filter away the too many "-"
    .filter((m, i, array) => {
      return i === 0 || m !== array[i-1];
    })

    // two consecutive months get a ", ""
    const len = fin.length;
    if(len > 1) {
      if(fin[0] === "-") {
        const first = fin[1];
        fin.splice(0, 2); // remove the - and the first
        fin.push("-"); // and insert it in the end!
        fin.push(first);
      }
      if(fin[len - 1] === "-") {
        const last = fin[len - 2];
        fin.splice(len - 2, 2); // remove the last and the -
        fin.splice( 0, 0, ...[last, "-"])// and insert it at the start!
      }
    }

    return fin.map((m, i, array) => {
      let month;
      if(m === "-")
        month = m;
      else if(i !== 0 && array[i-1] !== "-")
        month = (<span key={i}>, {this.renderMonthWithTooltip(m)}</span>);
      else
        month = (<span key={i}>{this.renderMonthWithTooltip(m)}</span>);
      return <span key={i}>{month}</span>
    });
  }

  getErnte() {
    const {flora} = this.props;
    return Object.keys(flora.Ernte).map((f, i) => {
      return (
        <ListGroupItem key={i}>
          <strong>{f}: </strong>
          <ul>
            {this.renderMonths(flora.Ernte[f])}
          </ul>
        </ListGroupItem>
      )
    });
  }

  render() {
    const {flora} = this.props;
    const {Name, Seite, Sonstiges} = flora;
    return (
      <Panel eventKey={Name}>
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
            {Sonstiges ? <ListGroupItem><strong>Sonstiges:</strong> {Sonstiges}</ListGroupItem> : ""}
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  }
}
