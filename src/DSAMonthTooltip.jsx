import React, { Component } from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {DSAMonths} from './DSAUtils.jsx';

export default class DSAMonthTooltip extends Component {
  render()
  {
    const m = DSAMonths[this.props.month];
    const tooltip = (
        <Tooltip id="dsa-month-tooltip">
          Irdisch: <strong>{m.irdisch}</strong><br />
          Thorwal: <strong>{m.thorwaler}</strong><br />
          Zwerge: <strong>{m.zwerge}</strong>
        </Tooltip>
      )
    return (
      <OverlayTrigger placement="bottom" overlay={tooltip}>
        {this.props.children}
      </OverlayTrigger>
    );
  }
}
