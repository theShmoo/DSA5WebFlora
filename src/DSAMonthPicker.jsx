import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, ButtonToolbar, Button, ButtonGroup, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {DSAMonths} from './DSAUtils.jsx';

export default class FilterWidget extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      lang: "normal"
    }

    this.onToggle = this.onToggle.bind(this);
  }

   onToggle(event) {
    let filter = {};
    const {property, selected} = this.props;
    const v = Number(event.target.value);


    filter[property] = selected;
    const index = selected.indexOf(v);

    if(index === -1) {
      filter[property].push(v);
    }
    else {
      filter[property].splice(index, 1);
    }
    this.props.onUserInput(filter);
  }

  render()
  {
    const {selected, property, title} = this.props;
    let id = "filter-" + property;

    const renderMonths = DSAMonths.map((m, i) => {
      const tooltip = (
        <Tooltip id="tooltip">
          Irdisch: <strong>{m.irdisch}</strong><br />
          Thorwal: <strong>{m.thorwaler}</strong><br />
          Zwerge: <strong>{m.zwerge}</strong>
        </Tooltip>
      )
      const active = selected.length === 0 || selected.includes(i);
      return (
        <OverlayTrigger key={i} placement="bottom" overlay={tooltip}>
          <Button bsStyle="primary" value={i} active={active} onClick={this.onToggle} style={{margin: "0.1em"}}>
              {m.normal}
          </Button>
        </OverlayTrigger>
      );
    });
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{title}</ControlLabel>
        <ButtonToolbar>
          <ButtonGroup>
            {renderMonths}
          </ButtonGroup>
        </ButtonToolbar>
      </FormGroup>
    );
  }
}

FilterWidget.propTypes = {
  selected: PropTypes.array,
  options: PropTypes.array,
};

