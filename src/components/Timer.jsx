import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'underscore'
import * as ItemActions from '../actions/ListActions.js'
import Modal from 'react-modal';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    _.bindAll(this,
      'start',
      'stop',
      'reset',
      'progress'
    );
  }

  start() {

    const {itemId, checkStarted} = this.props;

    if (checkStarted == undefined) {
      this._interval = requestAnimationFrame(this.progress);

      this.props.startTimer(itemId, Date.now());
    } else {
      this.setState({
        modalIsOpen: true
      })
    }


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
    };

    time = new Date(time);

    let h = pad(time.getUTCHours().toString(), 2);
    let m = pad(time.getMinutes().toString(), 2);
    let s = pad(time.getSeconds().toString(), 2);

    return `${h} : ${m} : ${s}`;

  }

  closeModal=()=> {
    this.setState({
      modalIsOpen: false
    });
  };

  render() {
    const {modalIsOpen} = this.state;
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="contentLabel"
          style={customStyles} >
          <div>You should stop active task at first!</div>
          <button onClick={this.closeModal}>close</button>
        </Modal>
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