import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import DSAMonthTooltip from './DSAMonthTooltip'
import {DSAMonths} from './DSAUtils';
import DSAMonth from './DSAMonth'

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

  renderMonths() {
    const {selected} = this.props;
    return DSAMonths.map((m, i) => {
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
  }

  renderTitle() {
    const {selected, title} = this.props;
    const monthsInTitle = selected.length === 0 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : selected;
    return <ControlLabel>{title} - <DSAMonth months={monthsInTitle} /></ControlLabel>
  }

  render()
  {
    const id = "filter-" + this.props.property;

    return (
      <FormGroup controlId={id}>
        {this.renderTitle()}
        <Grid fluid>
          {this.renderMonths()}
        </Grid>
      </FormGroup>
    );
  }
}

FilterWidget.propTypes = {
  selected: PropTypes.array,
  options: PropTypes.array,
};

