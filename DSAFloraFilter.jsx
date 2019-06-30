import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';
import DSAInfoBox from '../controls/DSAInfoBox';
import DSASelect from '../controls/DSASelect';

import DSAMonthPicker from './DSAMonthPicker';


const styles = {
  root: {
    flexGrow: 1,
  }
};

function DSAFloraFilter(props) {
  const {names, areas, regions, surroundings,
    filter, onFilterChanged} = props;

  const onfilterResultToFilter = (prop, values) => {
    if(values) {
      onFilterChanged(prop, values.map(v => v.value));
    }
    else {
      onFilterChanged(prop, []);
    }
  }

  const nameOptions = names.map(a => {return {value: a, label: a}});
  const regionOptions = regions.map(a => {return {value: a, label: a}});
  const areaOptions = areas.map(a => {return {value: a, label: a}});
  const surroundingOptions = surroundings.map(a => {return {value: a, label: a}});

  return <DSAInfoBox title="Filter">
    <DSAGrid>
      <DSAGridItem xs={12} sm={12} md={6}>
        <DSASelect options={nameOptions}
          label="Pflanzen"
          value={filter.names}
          multi={true}
          onChange={e => onfilterResultToFilter("names", e)}
          helperText="z.B.: Alraune" />
      </DSAGridItem>
      <DSAGridItem xs={12} sm={12} md={6}>
        <DSASelect options={regionOptions}
          label="Regionen"
          value={filter.regions}
          multi={true}
          onChange={e => onfilterResultToFilter("regions", e)}
          helperText="z.B.: Mittelreich" />
      </DSAGridItem>
      <DSAGridItem xs={12} sm={12} md={6}>
        <DSASelect options={areaOptions}
          label="Gebiete"
          value={filter.areas}
          multi={true}
          onChange={e => onfilterResultToFilter("areas", e)}
          helperText="z.B.: Neunaugensee." />
      </DSAGridItem>
      <DSAGridItem xs={12} sm={12} md={6}>
        <DSASelect options={surroundingOptions}
          label="Umgebung"
          value={filter.surroundings}
          multi={true}
          onChange={e => onfilterResultToFilter("surroundings", e)}
          helperText="z.B.: Waldrand" />
      </DSAGridItem>
      <DSAGridItem xs={12}>
        <DSAMonthPicker
          selected={filter.months}
          onChange={v => onFilterChanged("months", v)}/>
      </DSAGridItem>
    </DSAGrid>
  </DSAInfoBox>
}

DSAFloraFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DSAFloraFilter);

// <Col xs={12} sm={6} md={3}>
//   <FilterWidget options={names}
//       title="Pflanze"
//       selected={this.state.filter.names}
//       property="names"
//       onUserInput={this.onFilterChanged} >
//       Suche nach einer oder mehreren speziellen Pflanzenarten (z.B.: Alraune). <br/>
//       Die angezeigten Auswahlmöglichkeiten hängen von den anderen Filtern ab.
//     </FilterWidget>
// </Col>

// <Col xs={12} sm={6} md={3}>
//   <FilterWidget options={umgebung}
//     title="Umgebung"
//     selected={this.state.filter.umgebung}
//     property="umgebung"
//     onUserInput={this.onFilterChanged}>
//     Suche nach einer oder mehreren Umgebungen (z.B.: Waldrand). <br/>
//     Die angezeigten Auswahlmöglichkeiten hängen von den anderen Filtern ab.
//   </FilterWidget>
// </Col>
// <DSAMonthPicker title="Erntezeit"
//             selected={this.state.filter.months}
//             property="months"
//             onUserInput={this.onFilterChanged} />
