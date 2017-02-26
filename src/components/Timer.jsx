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
      'stop'
    );
  }

  start() {

    const {itemId} = this.props;

    this.props.startTimer(itemId, Date.now());

    this.interval = setInterval(() => {
      this.props.tick(itemId, Date.now());
    });
  }

  stop() {
    const {itemId} = this.props;
    this.interval = clearInterval(this.interval);
    this.props.stopTimer(itemId);
  }

  click() {
    this.props.isOn ? start() : stop();
  }

  format(time) {

    Number.prototype.pad = function (len) {
      return (new Array(len+1).join("0") + this).slice(-len);
    }

    time = new Date(time);

    var timeFormatted = time.getUTCHours().pad(2) + ":"
      + time.getMinutes().pad(2) + ":"
      + time.getSeconds().pad(2);

    return timeFormatted;
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