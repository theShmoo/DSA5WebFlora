import React, { Component } from 'react';
import {Col, Row, PageHeader} from 'react-bootstrap';
import DSAFlora from './DSAFlora.jsx';

export default class DSAFloraGrid extends Component {
  render()
  {
    const flora = this.props.flora.map((f, i) => {
      return (
        <Col sx={6} md={4} key={i}>
          <DSAFlora flora={f} />
        </Col>);
    })
    return (
      <div>
        <Row>
          <PageHeader>Flora</PageHeader>
        </Row>
        {flora}
      </div>
    );
  }
}
