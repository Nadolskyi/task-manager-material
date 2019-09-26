import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import ConfirmDeleteForm from './ConfirmDeleteForm/ConfirmDeleteForm.js'
import EditTask from './EditTask/EditTask.js'
import { ListContext } from '../../contexts/ListContext.js';
import './ListTask.css';
import List from '@material-ui/core/List';

const ListTask = () => {
  const onDragStart = (e, text) => {
    e.dataTransfer.setData("text", text)
  }
  const { tasks, dispatch } = useContext(ListContext);
  const showListDone = (isDone) => {
    return tasks.map((task, i) => {
      if (task.isDone === isDone) {
        return <List
          key={i}
          className="draggable-elem"
          draggable
          onDragStart={(e) => onDragStart(e, task.text)}
        >
          {task.text}
          <Row>
            <ConfirmDeleteForm index={i} />
            <EditTask task={tasks[i]} index={i} />
          </Row>
        </List>
      }
    })
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e, isDone) => {
    let text = e.dataTransfer.getData("text");
    tasks.filter((task, i) => {
      if (task.text === text) {
        task.isDone = isDone;
        dispatch({ type: 'EDIT_BOOK' })
      }
    })
  }

  return (
    <Row>
      <Col
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false)}
      >
        <h4>{'Active'}</h4>
        <List>
          {showListDone(false)}
        </List>
      </Col>
      <Col
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true)}
      >
        <h4>{'Done'}</h4>
        <List>
          {showListDone(true)}
        </List>
      </Col>
    </Row>
  );
}

export default ListTask;

