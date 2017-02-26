import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
import * as ItemActions from '../actions/ListActions.js'

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

  }

  start() {
    /*store.dispatch({
      type: 'START_TIMER',
      offset: Date.now(),
    });*/

    this.props.startTimer();

    this.interval = setInterval(() => {
      /*store.dispatch({
        type: 'TICK',
        time: Date.now()
      });*/
      this.props.tick();
    });
  }

  stop() {
    this.interval = clearInterval(this.interval);
    /*store.dispatch({
      type: 'STOP_TIMER'
    });*/
    this.props.stopTimer();
  }

  click() {
    this.props.isOn ? start() : stop();
  }

  format(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    }

    time = new Date(time);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${m} : ${s} . ${ms}`;
  }

  render() {
    return (
      <div>
        <h1>Time: {this.format(this.props.time)}</h1>
        <button onClick={this.interval ? this.stop : this.start}>
          { this.interval ? 'Stop' : 'Start' }
        </button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return {
    startTimer: bindActionCreators(ItemActions.startTimerDispatch, dispatch),
    stopTimer: bindActionCreators(ItemActions.stopTimerDispatch, dispatch),
    tick: bindActionCreators(ItemActions.tickDispatch, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)