import React, { Component } from 'react'
import { Modal, Form } from 'react-bootstrap';
import { ListContext } from '../../contexts/ListContext';
import Button from '@material-ui/core/Button';

class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDone: false,
      taskText: "",
      show: false
    }
  }

  static contextType = ListContext;

  handleChange = (event) => {
    this.setState({ taskText: event.target.value });
  }

  handleClose = () => {
    this.setState({
      taskText: "",
      show: false
    })
  }

  handleShow = () => {
    this.setState({
      show: true
    })
  }

  handleAdd = (e) => {
    e.preventDefault();
    const { dispatch } = this.context;
    dispatch({ type: 'ADD_TASK', task: this.state.taskText, isDone: this.state.isDone });
    this.setState({
      show: false,
      isDone: false,
      taskText: ""
    })
  }

  changeStatus = () => {
    this.setState({
      isDone: !this.state.isDone
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <h3 className="AddTask-header">React Task Manager</h3>
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-success AddTask-button" onClick={this.handleShow}>Add</button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>React Task Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleAdd}>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={this.state.taskText}
                  onChange={this.handleChange}
                  id="inputTask"
                  placeholder="Enter task to add"
                />
                <Form.Check
                  type="checkbox"
                  checked={this.state.isDone}
                  label={this.state.isDone ? "Move to active" : "Checked as done"}
                  onChange={this.changeStatus.bind(this)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleAdd} className="btn btn-primary">
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTask;