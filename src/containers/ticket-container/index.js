import React, { Component, PropTypes } from 'react';
import Ticket from '../../components/ticket/index.js';
import {
  removeItemFromArray,
  addItemIntoArray,
  drop,
  dragoverHandler,
  persistDataToLocalStorage,
} from '../../utils/index';
import Style from './style.css';

export default class TicketContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      title: this.props.title,
      isTrackVisible: true,
    };
  }

  addTask(e) {
    let updatedArray = addItemIntoArray(this.state.data);
    this.setState({ data: updatedArray});
    persistDataToLocalStorage(this.state.title, updatedArray);

  }

  deleteTask(e) {
    let updatedArray = removeItemFromArray(this.state.data, e.currentTarget.dataset.taskid);
    this.setState({
      data: updatedArray
    });
    persistDataToLocalStorage(this.state.title, updatedArray);
  }

  hideTrack(e) {
    this.setState({isTrackVisible: false});
  }


  render() {
    const finalList =
      this.state &&
      this.state.data.length &&
      this.state.data.map(ticketData => {
        return (
          <Ticket item={ticketData} deleteTask={this.deleteTask} scope={this} editTask={this.editTask} saveTask={this.saveTask}/>
        );
      });
    return (
      this.state.isTrackVisible ? (<div
        className={Style.desk}
        style={{ opacity: 1 }}
        onDragOver={dragoverHandler}
        onDrop={drop}
        title={this.state.title}
      >
        <div className={Style.deskHead}>
          <div className={Style.deskName}>
            {this.props.title}
            <span onClick={e => this.addTask.call(this)}>➕</span>
            <span onClick={e => this.hideTrack.call(this)}>❌</span>
          </div>
        </div>
        {finalList}
      </div>) : null
    );
  }
}
