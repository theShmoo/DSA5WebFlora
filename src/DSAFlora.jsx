import React, { Component } from 'react';
import {Panel, ListGroup} from 'react-bootstrap';
import DSAAreaProperty from './DSAAreaProperty'
import DSASearchProperty from './DSASearchProperty'
import DSACropProperty from './DSACropProperty'
import DSAPublicationProperty from './DSAPublicationProperty'
import DSATextProperty from './DSATextProperty'
import DSAUsesProperty from './DSAUsesProperty'

export default class DSAFlora extends Component {

  render() {
    const {flora} = this.props;
    const {Name, Sonstiges, Gebiete, Schwierigkeit, Ernte, Publikationen, Wirkung, Preis, Suchschwierigkeit, Bestimmungsschwierigkeit, Anwendungen} = flora;
    return (
      <Panel eventKey={Name}>
        <Panel.Heading>
          <Panel.Title toggle>
            {Name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <ListGroup>
            <DSATextProperty title="Wirkung" text={Wirkung} />
            <DSATextProperty title="Suchschwierigkeit" text={Suchschwierigkeit} />
            <DSATextProperty title="Bestimmungsschwierigkeit" text={Bestimmungsschwierigkeit} />
            <DSATextProperty title="Preis" text={Preis} />
            <DSAAreaProperty title="Gebiete" areas={Gebiete} />
            <DSASearchProperty title="Suche" searches={Schwierigkeit} />
            <DSAUsesProperty title="Anwendungen" uses={Anwendungen} />
            <DSACropProperty title="Ernte" crop={Ernte} />
            <DSATextProperty title="Sonstiges" text={Sonstiges} />
            <DSAPublicationProperty title="Publikationen" publications={Publikationen} />
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  }
}
