import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import FilterWidget from './FilterWidget.jsx';
import DSAMonthPicker from './DSAMonthPicker.jsx';
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
    this.setState({
      "filter":
      {
        "gebiete": ["1"],
        "months": []
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

  render() {
    return (
      <Grid>
        <Jumbotron>
          <h1>DSA 5 Web Flora</h1>
        </Jumbotron>
        <Row>
          <PageHeader>Filter</PageHeader>
        </Row>
        <Col>
          <FilterWidget options={["1","2","3"]}
            title="Gebiet"
            selected={this.state.filter.gebiete}
            property="gebiete"
            onUserInput={this.onFilterChanged}/>
          <DSAMonthPicker title="Erntezeit"
            selected={this.state.filter.months}
            property="months"
            onUserInput={this.onFilterChanged} />
        </Col>
      </Grid>
    );
  }
}
