import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import DSAMonthTooltip from './DSAMonthTooltip.jsx'
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
      const active = selected.length === 0 || selected.includes(i);
      return (
        <Col key={i} xs={3} sm={2}>
          <DSAMonthTooltip month={i}>
            <Button bsStyle="primary" value={i} active={active} onClick={this.onToggle} block style={{margin: "0.1em"}}>
                {m.normal}
            </Button>
          </DSAMonthTooltip>
        </Col>
      );
    });
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{title}</ControlLabel>
        <Grid fluid>
          {renderMonths}
        </Grid>
      </FormGroup>
    );
  }
}

FilterWidget.propTypes = {
  selected: PropTypes.array,
  options: PropTypes.array,
};

