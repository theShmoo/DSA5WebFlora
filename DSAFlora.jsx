import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {mapObject} from '../utils/MapUtils';
import {Months} from '../utils/DSATextElements';

import DSAItemList from '../controls/DSAItemList';

const styles = {
  root: {
    flexGrow: 1,
  }
};

function getFloraItems(flora) {
  const {Name, Sonstiges, Gebiete, Schwierigkeit,
    Ernte, Publikationen, Wirkung, Preis,
    Suchschwierigkeit, Bestimmungsschwierigkeit,
    Anwendungen} = flora;

  let items = [];
  if(Wirkung)
    items.push({name: "Wirkung", value: Wirkung});
  if(Suchschwierigkeit)
    items.push({name: "Suchschwierigkeit", value: Suchschwierigkeit});
  if(Bestimmungsschwierigkeit)
    items.push({name: "Bestimmungsschwierigkeit", value: Bestimmungsschwierigkeit});
  if(Preis)
    items.push({name: "Preis", value: Preis});
  if(Gebiete) {
    const areas = Gebiete.map((a) => {return {value: a}});
    items.push({title: "Gebiete", items: areas});
  }
  if(Schwierigkeit) {
    const difficulties = mapObject(Schwierigkeit, (k) => {
      return {name: k, value: Schwierigkeit[k]}});
    items.push({title: "Suche", items: difficulties});
  }
  if(Anwendungen) {
    const uses = Anwendungen.map((a,i) => {
      return {name: "Qualitätsstufe " + (i + 1), value: a}});
    items.push({title: "Anwendungen", items: uses})
  }
  if(Ernte) {
    const crop = mapObject(Ernte, (k) => {
      return {name: k, value: Months(Ernte[k])}
    })
    items.push({title: "Ernte", items: crop});
  }
  if(Sonstiges)
    items.push({name: "Sonstiges", value: Sonstiges});
  if(Publikationen) {
    const pubs = mapObject(Publikationen, (k) => {
      return {value: k + " - Seite " + Publikationen[k] }
    });
    items.push({title: "Publikationen", items: pubs})
  }
  return [{title: Name, items: items}];
}

function DSAFlora(props) {
  const {flora} = props;
  return <DSAItemList collapse={true} items={getFloraItems(flora)} />;
}


DSAFlora.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DSAFlora);
