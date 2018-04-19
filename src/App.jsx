import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import FilterWidget from './FilterWidget.jsx';
import DSAMonthPicker from './DSAMonthPicker.jsx';
import './App.css';
import data from "./data.jsx";


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {
        gebiete: [],
        months: []
      },
    };

    this.onFilterChanged = this.onFilterChanged.bind(this)
  }

  componentDidMount()
  {
    this.setState({
      filter:
      {
        gebiete: [],
        months: []
      }
    });
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

  getFilteredFlora(flora, currentFilter) {
    return flora.filter((f) => {
      // check the filters:
      // 1) Gebiet
      if(currentFilter.gebiete.length > 0 && !f.Gebiete.some(r => currentFilter.gebiete.includes(r)))
        return false;
      // 2) Month
      if(currentFilter.months.length > 0) {
        // check if there is something to harvest:
        let bFound = Object.keys(f.Ernte).some(function (key) {
          return f.Ernte[key].some(r => currentFilter.months.includes(r));
        });
        if(!bFound)
          return false;
      }

      return true;
    });
  }

  render() {
    const gebiete = this.getGebiete(data.flora);
    const filteredFloraCols = this.getFilteredFlora(data.flora, this.state.filter)
    .map((f) => {
      return (<Col sx={6} md={4}>{f.Name}</Col>);
    });
    return (
      <Grid>
        <Jumbotron>
          <h1>DSA 5 Web Flora</h1>
        </Jumbotron>
        <Row>
          <PageHeader>Filter</PageHeader>
        </Row>
        <Col xs={6} md={4}>
          <FilterWidget options={gebiete}
            title="Gebiet"
            selected={this.state.filter.gebiete}
            property="gebiete"
            onUserInput={this.onFilterChanged}/>
        </Col>
        <Col xs={6} md={4}>
          <DSAMonthPicker title="Erntezeit"
            selected={this.state.filter.months}
            property="months"
            onUserInput={this.onFilterChanged} />
        </Col>
        <Row>
          <PageHeader>Flora</PageHeader>
        </Row>
        {filteredFloraCols}
      </Grid>
    );
  }
}
