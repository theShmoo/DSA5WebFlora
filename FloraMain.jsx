import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { DSAGrid, DSAGridRow } from '../controls/DSAGrid';

import DSAFloraGrid from './DSAFloraGrid';
import DSAFloraFilter from './DSAFloraFilter'

import {Flora} from "../data/DSAFloraData";
import {Regions} from "../data/DSARegions";

const styles = {
  root: {
    flexGrow: 1,
  }
};

class FloraMain extends React.Component {

  state = {
    filter: {
      names: [],
      regions: [],
      areas: [],
      surroundings: [],
      months: []
    }
  }

  onFilterChanged = (prop, val) => {
    this.setState(prevState => {
      let newFilter = prevState.filter;
      newFilter[prop] = val;
      return {
        filter: newFilter
      };
    });
  }

  getFilteredRegions() {
    if(this.state.filter.regions.length > 0)
      return this.state.filter.regions;
    else
      return Object.keys(Regions);
  }

  getAreas(flora) {
    // get all area arrays
    const areaArrays = flora.map((f) => f.Gebiete);
    const regions = this.getFilteredRegions();

    // flattern the array (it is an array of arrays)
    return [].concat(...areaArrays)
      // only use unique values
      .filter((val, id, array) => array.indexOf(val) === id)
      // only use areas that are not filtered by the region:
      .filter((val) => regions.some(key => Regions[key].includes(val)))
      // sort it (by alph)
      .sort();
  }

  getRegions(areas) {
    let filteredAreas = areas
    if(this.state.filter.areas.length > 0)
      filteredAreas = this.state.filter.areas;
    return Object.keys(Regions).filter((k) =>
      Regions[k].some(r => filteredAreas.includes(r)));
  }

  getSurroundings(flora) {
    // get all surrounding arrays
    const surroundingArrays = flora.map((f) => {
        return Object.keys(f.Schwierigkeit);
    });
    // flattern the array (it is an array of arrays)
    return [].concat(...surroundingArrays)
    // only use unique values
    .filter((val, id, array) => {
       return array.indexOf(val) === id;
    })
    // sort it (by alph)
    .sort();
  }

  getFilteredFlora(flora, currentFilter) {
    return flora.filter((f) => {
      // check the filters:
      // 0) Name
      if(currentFilter.names.length > 0) {
        if(!currentFilter.names.includes(f.Name))
          return false;
      }
      // 1) Areas
      if(currentFilter.areas.length > 0) {
        if(!f.Gebiete.some(r => currentFilter.areas.includes(r)))
          return false;
      }

      // 2) Surroundings
      if(currentFilter.surroundings.length > 0) {
        if(!Object.keys(f.Schwierigkeit).some(r =>
          currentFilter.surroundings.includes(r)))
          return false;
      }

      // 3) Month
      if(currentFilter.months.length > 0) {
        // check if there is something to harvest:
        if(!Object.keys(f.Ernte).some((key) => f.Ernte[key].some(r => currentFilter.months.includes(r))))
          return false;
      }

      // 4) Regions
      if(currentFilter.regions.length > 0) {
        if(!f.Gebiete.some((g) => {
          return currentFilter.regions.some(key => Regions[key].includes(g));
          }))
          return false;
      }

      return true;
    });
  }

  render() {
    const { classes } = this.props;
    const filteredFlora = this.getFilteredFlora(Flora, this.state.filter)
    const names = filteredFlora.map(f => f.Name);
    const areas = this.getAreas(filteredFlora);
    const regions = this.getRegions(areas);
    const surroundings = this.getSurroundings(filteredFlora);
    return (
      <main className={classes.root}>
        <DSAGrid>
          <DSAGridRow>
            <DSAFloraFilter
              names={names}
              areas={areas}
              regions={regions}
              surroundings={surroundings}
              onFilterChanged={this.onFilterChanged}
              filter={this.state.filter}
            />
          </DSAGridRow>
          <DSAFloraGrid flora={filteredFlora} />
        </DSAGrid>
      </main>);
  }
};

FloraMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloraMain);
