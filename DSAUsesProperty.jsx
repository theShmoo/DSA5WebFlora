import React, { Component } from 'react';
import {Tooltip, OverlayTrigger, ListGroupItem} from 'react-bootstrap';

export default class DSAUsesProperty extends Component {

  renderTooltip(qs, use) {
    const tooltip = (
        <Tooltip id="dsa-uses-property-tooltip">
          Qualitätsstufe {qs}, {use === 1 ? "1 Anwendung" : use + "Anwendungen"}
        </Tooltip>
      )
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <span>{use}</span>
      </OverlayTrigger>
    );
  }

  renderUses(uses) {
    return uses.map((u, i) => {
      return <span key={i}>{i > 0 ? " / " : ""}{this.renderTooltip(i+1, u)}</span>;
    });
  }

  render()
  {
    const {title, uses} = this.props;
    if(!uses) return "";
    else
      return (
        <ListGroupItem>
          <strong>{title}</strong>: {this.renderUses(uses)}
        </ListGroupItem>
      );
  }
}
