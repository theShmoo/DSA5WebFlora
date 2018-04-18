import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";
import { FormGroup, ControlLabel} from 'react-bootstrap';

export default class FilterWidget extends Component {

  constructor(props)
  {
    super(props);

    this.filter = this.filter.bind(this);
  }

   filter(val) {
    let filter = {};

    if(val.constructor === Array)
      filter[this.props.property] = val.map(function (option) {
        return option.value;
      });
    else if(val.value)
      filter[this.props.property] = val.value;

    this.props.onUserInput(filter);
  }

  getOptions() {
    return this.props.options.map((m) => {return {value: m, label: m};});
  }

  render()
  {
    let id = "filter-" + this.props.property;
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{this.props.title}</ControlLabel>
        <Select
          multi={true}
          value={this.props.selected}
          onChange={this.filter}
          options={this.getOptions()} />
      </FormGroup>
    );
  }
}

FilterWidget.propTypes = {
  selected: PropTypes.array,
  options: PropTypes.array,
};

