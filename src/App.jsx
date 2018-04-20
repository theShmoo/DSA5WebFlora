import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import FilterWidget from './FilterWidget.jsx';
import DSAMonthPicker from './DSAMonthPicker.jsx';
import DSAFlora from './DSAFlora.jsx';
import {DSARegionen} from './DSAUtils.jsx';
import './App.css';
import data from "./data.jsx";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {
        regionen: [],
        gebiete: [],
        umgebung: [],
        months: []
      },
    };

    this.onFilterChanged = this.onFilterChanged.bind(this)
  }

  onFilterChanged(filter) {
    this.setState(prevState => {
      var newFilter = prevState.filter;
      for (var k in filter) {
        newFilter[k] = filter[k];
      }
      return {
        filter: newFilter
      };
    });
  }

  getRegionen(gebiete) {
    let regionen = []
    if(this.state.filter.regionen.length > 0)
      regionen = this.state.filter.regionen;
    else
      regionen = Object.keys(DSARegionen);

    return regionen.filter((k) => {
      return DSARegionen[k].some(r => gebiete.includes(r));
    })
  }

  getGebiete(flora) {
    // get all gebiete arrays
    const gebieteArrays = flora.map((f) => {
        return f.Gebiete;
    });
    // flattern the array (it is an array of arrays)
    return [].concat(...gebieteArrays)
    // only use unique values
    .filter((val, id, array) => {
       return array.indexOf(val) === id;
    })
    // sort it (by alph)
    .sort();
  }

  getUmgebung(flora) {
    // get all gebiete arrays
    const umgebungArrays = flora.map((f) => {
        return Object.keys(f.Schwierigkeit);
    });
    // flattern the array (it is an array of arrays)
    return [].concat(...umgebungArrays)
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
      // 1) Gebiet
      if(currentFilter.gebiete.length > 0 && !f.Gebiete.some(r => currentFilter.gebiete.includes(r)))
        return false;

      // 2) Umgebung
      if(currentFilter.umgebung.length > 0 && !Object.keys(f.Schwierigkeit).some(r => currentFilter.umgebung.includes(r)))
        return false;

      // 3) Month
      if(currentFilter.months.length > 0) {
        // check if there is something to harvest:
        let bFound = Object.keys(f.Ernte).some((key) => {
          return f.Ernte[key].some(r => currentFilter.months.includes(r));
        });
        if(!bFound)
          return false;
      }

      return true;
    });
  }

  render() {
    const filteredFlora = this.getFilteredFlora(data.flora, this.state.filter)
    const gebiete = this.getGebiete(filteredFlora);
    console.log(gebiete);
    const regionen = this.getRegionen(gebiete);
    const umgebung = this.getUmgebung(filteredFlora);
    return (
      <Grid>
        <Jumbotron>
          <h1>DSA 5 Web Flora</h1>
        </Jumbotron>
        <Row>
          <PageHeader>Filter</PageHeader>
        </Row>
        <Col xs={12} md={4}>
          <FilterWidget options={regionen}
            title="Regionen"
            selected={this.state.filter.regionen}
            property="regionen"
            onUserInput={this.onFilterChanged}/>
        </Col>
        <Col xs={12} md={4}>
          <FilterWidget options={gebiete}
            title="Gebiete"
            selected={this.state.filter.gebiete}
            property="gebiete"
            onUserInput={this.onFilterChanged}/>
        </Col>
        <Col xs={12} md={4}>
          <FilterWidget options={umgebung}
            title="Umgebung"
            selected={this.state.filter.umgebung}
            property="umgebung"
            onUserInput={this.onFilterChanged}/>
        </Col>
        <Col xs={12} md={12}>
          <DSAMonthPicker title="Erntezeit"
            selected={this.state.filter.months}
            property="months"
            onUserInput={this.onFilterChanged} />
        </Col>
        <DSAFlora flora={filteredFlora} />
      </Grid>
    );
  }
}
