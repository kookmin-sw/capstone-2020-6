import React, {Component} from 'react';

interface Props {
  datetime: any
}

class Time extends Component<Props> {
  render() {
    const date = new Date(this.props.datetime);
    const hoursTmp = date.getHours();
    const hours = hoursTmp >= 10 ? hoursTmp : '0' + hoursTmp;
    const minutesTmp = date.getMinutes();
    const minutes = minutesTmp >= 10 ? minutesTmp : '0' + minutesTmp;
    const secondsTmp = date.getSeconds();
    const seconds = secondsTmp >= 10 ? secondsTmp : '0' + secondsTmp;
    return (
      <>
        {/* 01:10:40 */}
        {hours}:{minutes}:{seconds}
      </>
    );
  }
}

export default Time;
