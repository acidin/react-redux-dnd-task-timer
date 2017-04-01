import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
import * as ItemActions from '../actions/ListActions.js'

class Timer extends React.Component {
  constructor(props) {
    super(props);

    _.bindAll(this,
      'start',
      'stop',
      'reset',
      'progress'
    );
  }

  start() {

    const {itemId} = this.props;

    this._interval = requestAnimationFrame(this.progress);

    this.props.startTimer(itemId, Date.now());

    /*this.interval = setInterval(() => {
      this.props.tick(itemId, Date.now());
    });*/
  }

  progress()  {
    const {itemId} = this.props;

    this.props.tick(itemId, Date.now());

    this._interval = requestAnimationFrame(this.progress);
  }

  stop() {
    const {itemId} = this.props;

    this.props.stopTimer(itemId);

    this._interval = cancelAnimationFrame(this._interval);

  }

  reset() {
    const {itemId} = this.props;
    this._interval = cancelAnimationFrame(this._interval);
    this.props.resetTimer(itemId);
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

    let h = pad(time.getUTCHours().toString(), 2);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);
    let ms = pad(time.getMilliseconds().toString(), 3);

    return `${h} : ${m} : ${s} . ${ms}`;

    //return timeFormatted;
  }

  render() {
    return (
      <div>
        <h1>Time: {this.format(this.props.time)}</h1>
        <button onClick={this._interval ? this.stop : this.start}>
          { this._interval ? 'Stop' : 'Start' }
        </button>
        <button onClick={this.reset}>
          Reset
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
    tick: bindActionCreators(ItemActions.tickDispatch, dispatch),
    resetTimer: bindActionCreators(ItemActions.resetTimerDispatch, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)