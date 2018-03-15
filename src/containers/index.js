import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import data from '../staticData.js';
import {initDataIntoLocalStorage, getDataOfParticularTaskID} from '../utils/index.js';
import {DONE, INPROGRESS, TESTINGLOG, BACKLOG} from '../constants/task_id.js';
import TicketContainer from './ticket-container/index.js';


export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backlogData: getDataOfParticularTaskID(BACKLOG),
      doneData: getDataOfParticularTaskID(DONE),
      testingLogData: getDataOfParticularTaskID(TESTINGLOG),
      inProgressData: getDataOfParticularTaskID(INPROGRESS),
    }
  }
  componentDidMount() {
    if (!localStorage.getItem('backlog') && !localStorage.getItem('done') && !localStorage.getItem('inProgres') && !localStorage.getItem('testingLog')) {
      initDataIntoLocalStorage();
    }
  }

  render() {
    return (
      <React.Fragment>
        <TicketContainer data={this.state.backlogData} title="backlog"/>
        <TicketContainer data={this.state.inProgressData} title="inProgres"/>
        <TicketContainer data={this.state.doneData} title="done"/>
        <TicketContainer data={this.state.testingLogData} title="testingLog"/>
      </React.Fragment>
    );
  }
}