import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import data from '../staticData.js';
import {initDataIntoLocalStorage, getDataOfParticularTaskID} from '../utils/index.js';
import {DONE, INPROGRESS, TESTINGLOG, BACKLOG} from '../constants/task_id.js';
import TicketContainer from './ticket-container/index.js';

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    /** Not used at presnent, will be required later */
    this.state = {
      backlogData: getDataOfParticularTaskID(BACKLOG),
      doneData: getDataOfParticularTaskID(DONE),
      testingLogData: getDataOfParticularTaskID(TESTINGLOG),
      inProgressData: getDataOfParticularTaskID(INPROGRESS),
    };
  }

  render() {
    return (
      <React.Fragment>
        <TicketContainer data={getDataOfParticularTaskID(BACKLOG)} title="backlog"/>
        <TicketContainer data={getDataOfParticularTaskID(INPROGRESS)} title="inProgress"/>
        <TicketContainer data={getDataOfParticularTaskID(DONE)} title="done"/>
        <TicketContainer data={getDataOfParticularTaskID(TESTINGLOG)} title="testingLog"/>
      </React.Fragment>
    );
  }
}