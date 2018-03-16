import React from "react";
import Style from "./style.css";
import { dragStart, saveUpdatedTaskInTrack } from "../../utils/index";

import PropTypes from 'prop-types';


export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.item,
      isEdittable: false,
      trackLocation: this.props.title,
      editdescription: '',
      edittitle: ''
    };
  }

  editTask(e) {
    this.setState({ isEdittable: true });
  }

  saveTask(obj) {
    this.setState({ isEdittable: false });
    saveUpdatedTaskInTrack(this.state.trackLocation, obj , this.state.editdescription, this.state.edittitle);
  }

  changingData(e) {
    if (e.target.dataset.sectionid === 'description') {
      this.setState({editdescription: e.target.innerText});
    } else if(e.target.dataset.sectionid === 'title') {
      this.setState({edittitle: e.target.innerText});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.id === this.props.id && nextState.isEdittable === this.state.isEdittable) {
      return false;
    }
    return true;
  }

  render() {
    const { item } = this.props;
    return !this.state.isEdittable ? (
      <span onDrop={() => false}>
        <article
          className={Style.item}
          tabIndex="0"
          data-taskid={item.id}
          draggable="true"
          onDragStart={dragStart}
          onDrop={() => false}
          data-firstname={item.firstName}
          data-lastname={item.lastName}
          data-description={item.description}
          data-tasktitle={item.title}
          data-track={this.state.trackLocation}>
          <header onDrop={() => false} className={Style.header}>
            <span>Title: {this.state.edittitle || item.title}</span>
            <span
              data-taskid={item.id}
              onClick={e => this.props.deleteTask.call(this.props.scope, e)}
              className={Style.btn}>
              ❌
            </span>
          </header>
          <div className={Style.icontainer} onMouseDown={() => false}>
            <div>
              <div>Assigned To : {`${item.firstName} ${item.lastName}`}</div>
              <p>Status : {this.state.editdescription || item.description}</p>
            </div>
          </div>
          <span onClick={e => this.editTask(e)} className={Style.btn}>
            ✎
          </span>
        </article>
      </span>
    ) : (
      <span onDrop={() => false}>
        <article
          className={Style.eitem}
          tabIndex="0"
          data-taskid={item.id}
          draggable="true"
          onDragStart={dragStart}
          onDrop={() => false}>
          <header onDrop={() => false} className={Style.header}>
          <span>Title: </span><div contentEditable="true" data-sectionid ="title" suppressContentEditableWarning={true} onKeyDown={(e) => this.changingData(e)}>{item.title}</div>
            <span
              data-taskid={item.id}
              onClick={e => this.props.deleteTask.call(this.props.scope, e)}
              className={Style.btn}>
              ❌
            </span>
          </header>
          <div className={Style.icontainer} onMouseDown={() => false}>
            <div>
              <div>Assigned To : {`${item.firstName} ${item.lastName}`}</div>
              Status : <p contentEditable="true" data-sectionid ="description" suppressContentEditableWarning={true} onKeyDown={(e) => this.changingData(e)}>{item.description}</p>
            </div>
          </div>
          <span onClick={() => this.saveTask(item)} className={Style.btn}>
            ✔
          </span>
        </article>
      </span>
    );
  }
}

Ticket.propTypes = {
  item: PropTypes.object,
  scope: PropTypes.object,
  deleteTask: PropTypes.func
};
