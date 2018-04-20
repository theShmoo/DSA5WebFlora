import React, { Component } from 'react';
import {Col, Row, PageHeader} from 'react-bootstrap';

export default class DSAFlora extends Component {

  constructor(props)
  {
    super(props);
  }

  render()
  {
    const flora = this.props.flora.map((f, i) => {
      return (<Col sx={6} md={4} key={i}>{f.Name}</Col>);
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
