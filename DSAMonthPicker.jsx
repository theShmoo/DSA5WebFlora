import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {DSAMonths} from '../data/DSAMonths';
import {Months} from '../utils/DSATextElements';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function getMonths(months, onToggle) {
  return DSAMonths.map((m, i) => {
    const active = months.length === 0 || months.includes(i);
    return <FormControlLabel key={i}
        control={
          <Checkbox
            checked={active}
            onChange={onToggle}
            value={i} />
          }
          label={m.normal}
        />;
  });
}

function getTitle(months) {
  const monthsInTitle = months.length === 0
    ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    : months;
  return "Monate - " + Months(monthsInTitle);
}

function DSAMonthPicker(props) {

  const classes = useStyles();

  const {onChange, selected} = props;

  const onToggle = (event) => {
    let months = selected;
    const v = Number(event.target.value);

    const index = selected.indexOf(v);

    if(index === -1) {
      months.push(v);
    }
    else {
      months.splice(index, 1);
    }
    onChange(months);
  }
  return (<div className={classes.root}>
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{getTitle(selected)}</FormLabel>
      <FormGroup row>
        {getMonths(selected, onToggle)}
      </FormGroup>
    </FormControl>
  </div>);
}

DSAMonthPicker.propTypes = {
  selected: PropTypes.array,
  options: PropTypes.array,
};

export default DSAMonthPicker;

