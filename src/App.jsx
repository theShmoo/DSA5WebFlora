import React, { Component } from 'react';
import { Jumbotron, Grid, Row, PageHeader} from 'react-bootstrap';
import FilterWidget from './FilterWidget.jsx';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {}
    };

    this.onFilterChanged = this.onFilterChanged.bind(this)
  }

  componentDidMount()
  {

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

  render() {
    return (
      <Grid>
        <Jumbotron>
          <h1>DSA 5 Web Flora</h1>
        </Jumbotron>
        <Row>
          <PageHeader>Filter</PageHeader>
        </Row>
        <FilterWidget options={["1","2","3"]}
          title="Filter by Machine"
          selected="1"
          property="maschine_id"
          onUserInput={this.onFilterChanged}/>
        <FilterWidget options={["1","2","3"]}
          title="Filter by Channel"
          selected="2"
          property="prop"
          onUserInput={this.onFilterChanged}/>
      </Grid>
    );
  }
}
