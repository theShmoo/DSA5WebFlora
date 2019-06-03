import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";
import { FormGroup, ControlLabel, OverlayTrigger, Popover} from 'react-bootstrap';

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
    const tooltip = (
          <Popover id="popover" title={this.props.tooltip ? this.props.tooltip : this.props.title} style={{ width: 800 }}>
            {this.props.children ? this.props.children : this.props.tooltip ? this.props.tooltip : this.props.title}
          </Popover>
        );

    return (
      <FormGroup controlId={id}>
        <OverlayTrigger placement="bottom" trigger="click" overlay={tooltip}>
          <ControlLabel style={{cursor: "pointer"}}>{this.props.title}</ControlLabel>
        </OverlayTrigger>
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

