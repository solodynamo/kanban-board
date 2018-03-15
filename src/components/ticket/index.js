import React, { PropTypes } from 'react';
import Style from './style.css';
import { dragStart } from '../../utils/index';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: this.props.item,
      isEdittable: false,
    };
  }


  editTask(e) {
    this.setState({isEdittable: true});
  }

  saveTask(e) {
    this.setState({isEdittable: false});
  }

  render() {
  const { item } = this.props;
    return (
      !this.state.isEdittable ? (<span onDrop={() => false}>
        <article
          className={Style.item}
          tabIndex="0"
          data-taskid={item.id}
          draggable="true"
          onDragStart={dragStart}
          onDrop={() => false}
          firstname={item.firstName}
          lastname={item.lastName}
          description={item.description}
          tasktitle={item.title}
          track={item.track}
        >
          <header onDrop={() => false} className={Style.header}>
            <span>Title: {item.title}</span>
            <span data-taskid={item.id}  onClick={e => this.props.deleteTask.call(this.props.scope, e)} className={Style.btn}>❌</span>
          </header>
          <div className={Style.icontainer} onMouseDown={() => false}>
            <div>
              <div>Assigned To : {`${item.firstName} ${
                item.lastName
              }`}</div>
              <p>Status : {item.description}</p>
            </div>
          </div>
          <span onClick={(e) => this.editTask(e)} className={Style.btn}>✎</span>
        </article>
      </span>) : (
        (<span onDrop={() => false}>
          <article
            className={Style.eitem}
            tabIndex="0"
            data-taskid={item.id}
            draggable="true"
            onDragStart={dragStart}
            onDrop={() => false}
          >
            <header onDrop={() => false} className={Style.header}>
              <span contentEditable="true">Title: {item.title}</span>
              <span onClick={e => this.props.deleteTask.call(this.props.scope, e)} className={Style.btn}>❌</span>
            </header>
            <div className={Style.icontainer} onMouseDown={() => false}>
              <div>
                <div>Assigned To : {`${item.firstName} ${
                  item.lastName
                }`}</div>
                <p contentEditable="true">Status : {item.description}</p>
              </div>
            </div>
            <span onClick={(e) => this.saveTask(e)} className={Style.btn}>✔</span>
          </article>
        </span>)
        )
      );
    }
}