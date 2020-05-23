import React, {Component} from 'react';

interface Props {
  datetime: any
}

class Datetime extends Component<Props> {
  render() {
    const date = new Date(this.props.datetime);
    const year = date.getFullYear();
    const monthTmp = date.getUTCMonth() + 1;
    const month = monthTmp >= 10 ? monthTmp : '0' + monthTmp;
    const dayTmp = date.getDate();
    const day = dayTmp >= 10 ? dayTmp : '0' + dayTmp;
    return (
      <>
        {/* 2020.01.01 */}
        {year}.{month}.{day}
      </>
    );
  }
}

export default Datetime;
