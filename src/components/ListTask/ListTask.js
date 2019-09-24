import React, { useContext } from 'react'
import { Row, ListGroup, Col } from 'react-bootstrap'
import ConfirmDeleteForm from './ConfirmDeleteForm/ConfirmDeleteForm.js'
import EditTask from './EditTask/EditTask.js'
import { ListContext } from '../../contexts/ListContext.js';
import './ListTask.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const ListTask = () => {

  const { tasks } = useContext(ListContext);
  const showListDone = (isDone) => {
    return tasks.map((task, i) => {
      if (task.isDone === isDone) {
        return <List
          key={i}
          className="draggable-elem"
          draggable
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

  return (
    <Row>
      <Col>
        <h4>{'Active'}</h4>
        <List>
          {showListDone(false)}
        </List>
      </Col>
      <Col>
        <h4>{'Done'}</h4>
        <List>
          {showListDone(true)}
        </List>
      </Col>
    </Row>
  );
}

export default ListTask;

