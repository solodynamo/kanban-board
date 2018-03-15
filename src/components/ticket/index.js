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
          firstName={item.firstName}
          lastName={item.lastName}
          description={item.description}
          tasktitle={item.title}
          track={item.track}
        >
          <header onDrop={() => false}>
            <span>{item.title}</span>
            <span data-taskid={item.id}  onClick={e => this.props.deleteTask.call(this.props.scope, e)}>❌</span>
          </header>
          <div className={Style.icontainer} onMouseDown={() => false}>
            <div>
              <div>{`${item.firstName} ${
                item.lastName
              }`}</div>
              <p>{item.description}</p>
            </div>
          </div>
          <span onClick={(e) => this.editTask(e)}>✎</span>
        </article>
      </span>) : (
        (<span onDrop={() => false}>
          <article
            className={Style.item}
            tabIndex="0"
            data-taskid={item.id}
            draggable="true"
            onDragStart={dragStart}
            onDrop={() => false}
          >
            <header onDrop={() => false}>
              <span contentEditable="true">{item.title}</span>
              <span onClick={e => this.props.deleteTask.call(this.props.scope, e)}>❌</span>
            </header>
            <div className={Style.icontainer} onMouseDown={() => false}>
              <div>
                <div>{`${item.firstName} ${
                  item.lastName
                }`}</div>
                <p contentEditable="true">{item.description}</p>
              </div>
            </div>
            <span onClick={(e) => this.saveTask(e)}>✔</span>
          </article>
        </span>)
        )
      );
    }
}