import React, { Component } from 'react';
import {DSAMonths} from './DSAUtils';
import DSAMonthTooltip from './DSAMonthTooltip'

export default class DSASearchProperty extends Component {

  renderMonthWithTooltip(month) {
    return <DSAMonthTooltip month={month}><span>{DSAMonths[month].normal}</span></DSAMonthTooltip>
  }

  render() {
    const {months} = this.props;
    // months should be integers
    // sort them:
    let sorted = months.sort((a, b) => a-b);
    const max = sorted.length - 1;
    const ids = sorted.filter((m, i, array) => {
      // if the index is 0 look at the other side of the array
      const id_before = i < 1 ? max : i - 1;
      const id_after = i >= max ? 0 : i + 1;
      const val_before = m < 1 ? 12 : m - 1;
      const val_after = m >= 12 ? 0 : m + 1;
      return array[id_before] === val_before && array[id_after] === val_after;
    });

    if(ids.length === DSAMonths.length) return "ganzjährig";

    /// to replace:
    const to_replace = ids.map((i) => sorted.indexOf(i))
    let fin = sorted.map((m, i, array) => {
      if (to_replace.includes(i))
        return "-"
      else
       return m;
    })
    // filter away the too many "-"
    .filter((m, i, array) => {
      return i === 0 || m !== array[i-1];
    })

    // two consecutive months get a ", ""
    const len = fin.length;
    if(len > 1) {
      if(fin[0] === "-") {
        const first = fin[1];
        const last = fin[len - 1];
        fin.splice(0, 2); // remove the - and the first
        // and insert it in the end! (if there is not already a "-")
        if(last !== "-")
          fin.push("-");
        fin.push(first);
      }
      if(fin[len - 1] === "-") {
        const last = fin[len - 2];
        fin.splice(len - 2, 2); // remove the last and the -
        fin.splice( 0, 0, ...[last, "-"])// and insert it at the start!
      }
    }

    return fin.map((m, i, array) => {
      let month;
      if(m === "-")
        month = m;
      else if(i !== 0 && array[i-1] !== "-")
        month = (<span key={i}>, {this.renderMonthWithTooltip(m)}</span>);
      else
        month = (<span key={i}>{this.renderMonthWithTooltip(m)}</span>);
      return <span key={i}>{month}</span>
    });
  }
}
