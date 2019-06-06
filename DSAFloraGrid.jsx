import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DSAFlora from './DSAFlora';
import { DSAGrid, DSAGridItem} from '../controls/DSAGrid';
import DSAInfoBox from '../controls/DSAInfoBox';

const styles = {
  root: {
    flexGrow: 1,
  }
};

function DSAFloraGrid(props) {
    const { classes, flora } = props;
    const all = flora.map((f, i) => {
      return (
        <DSAGridItem xs={12} sm={6} md={4} lg={3} key={i}>
          <DSAFlora flora={f} />
        </DSAGridItem>);
    })
    return (<div className={classes.root}>
        <DSAInfoBox title="Pflanzen">
          <DSAGrid>{all}</DSAGrid>
        </DSAInfoBox>
      </div>
    );
}

DSAFloraGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DSAFloraGrid);
