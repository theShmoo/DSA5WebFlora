import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, PageHeader, Image} from 'react-bootstrap';
import FilterWidget from './FilterWidget.jsx';
import DSAMonthPicker from './DSAMonthPicker.jsx';
import DSAFloraGrid from './DSAFloraGrid.jsx';
import {DSARegionen} from './DSAUtils.jsx';
import './App.css';
import data from "./data.jsx";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {
        names: [],
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

  getFilteredRegionen() {
    if(this.state.filter.regionen.length > 0)
      return this.state.filter.regionen;
    else
      return Object.keys(DSARegionen);
  }

  getGebiete(flora) {
    // get all gebiete arrays
    const gebieteArrays = flora.map((f) => {
        return f.Gebiete;
    });

    const regionen = this.getFilteredRegionen();

    // flattern the array (it is an array of arrays)
    return [].concat(...gebieteArrays)
    // only use unique values
    .filter((val, id, array) => {
       return array.indexOf(val) === id;
    })
    // only use gebiete that are not filtered by the region:
    .filter((val) => {
      return regionen.some(key => DSARegionen[key].includes(val));
    })
    // sort it (by alph)
    .sort();
  }

  getRegionen(gebiete) {
    let filteredGebiete = gebiete
    if(this.state.filter.gebiete.length > 0)
      filteredGebiete = this.state.filter.gebiete;
    return Object.keys(DSARegionen).filter((k) => {
      return DSARegionen[k].some(r => filteredGebiete.includes(r));
    });
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
      // 0) Name
      if(currentFilter.names.length > 0) {
        if(!currentFilter.names.includes(f.Name))
          return false;
      }
      // 1) Gebiet
      if(currentFilter.gebiete.length > 0) {
        if(!f.Gebiete.some(r => currentFilter.gebiete.includes(r)))
          return false;
      }

      // 2) Umgebung
      if(currentFilter.umgebung.length > 0) {
        if(!Object.keys(f.Schwierigkeit).some(r => currentFilter.umgebung.includes(r)))
          return false;
      }

      // 3) Month
      if(currentFilter.months.length > 0) {
        // check if there is something to harvest:
        if(!Object.keys(f.Ernte).some((key) => {
          return f.Ernte[key].some(r => currentFilter.months.includes(r));
        }))
          return false;
      }

      // 4) Region
      if(currentFilter.regionen.length > 0) {
        if(!f.Gebiete.some((g) => {
          return currentFilter.regionen.some(key => DSARegionen[key].includes(g));
          }))
          return false;
      }

      return true;
    });
  }

  render() {
    const filteredFlora = this.getFilteredFlora(data.flora, this.state.filter)
    const names = filteredFlora.map(f => f.Name);
    const gebiete = this.getGebiete(filteredFlora);
    const regionen = this.getRegionen(gebiete);
    const umgebung = this.getUmgebung(filteredFlora);
    return (
      <Grid>
        <Jumbotron>
          <h1>DSA 5 Web Flora</h1>
        </Jumbotron>
        <Row>
          <PageHeader>Filter <small>Klicke auf den Filter-Titel um mehr informationen zu erhalten.</small></PageHeader>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <FilterWidget options={names}
                title="Pflanze"
                selected={this.state.filter.names}
                property="names"
                onUserInput={this.onFilterChanged} >
                Suche nach einer oder mehreren speziellen Pflanzenarten (z.B.: Alraune). <br/>
                Die angezeigten Auswahlmöglichkeiten hängen von den anderen Filtern ab.
              </FilterWidget>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterWidget options={regionen}
              title="Regionen"
              selected={this.state.filter.regionen}
              property="regionen"
              onUserInput={this.onFilterChanged}>
              Suche nach einer oder mehreren speziellen Regionen (z.B.: Mittelreich). <br/>
              Die angezeigten Auswahlmöglichkeiten hängen von den anderen Filtern ab.
              <p>
              <Image src="./map.jpg" title="Karte von Regionen" alt="Karte von Regionen" responsive />
              </p>
            </FilterWidget>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterWidget options={gebiete}
              title="Gebiete"
              selected={this.state.filter.gebiete}
              property="gebiete"
              onUserInput={this.onFilterChanged}>
              Suche nach einem oder mehreren speziellen Gebieten (z.B.: Neunaugensee). <br/>
              Die angezeigten Auswahlmöglichkeiten hängen von den anderen Filtern ab.
            </FilterWidget>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <FilterWidget options={umgebung}
              title="Umgebung"
              selected={this.state.filter.umgebung}
              property="umgebung"
              onUserInput={this.onFilterChanged}>
              Suche nach einer oder mehreren Umgebungen (z.B.: Waldrand). <br/>
              Die angezeigten Auswahlmöglichkeiten hängen von den anderen Filtern ab.
            </FilterWidget>
          </Col>
        </Row>
        <Row>
          <DSAMonthPicker title="Erntezeit"
            selected={this.state.filter.months}
            property="months"
            onUserInput={this.onFilterChanged} />
        </Row>
        <DSAFloraGrid flora={filteredFlora} />
      </Grid>
    );
  }
}
