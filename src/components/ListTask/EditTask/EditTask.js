import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { ListContext } from '../../../contexts/ListContext';

class EditTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDone: this.props.task.isDone,
      taskText: this.props.task.text,
      show: false
    }
  }

  static contextType = ListContext;

  handleChange = (event) => {
    this.setState({ taskText: event.target.value });
  }

  handleClose = () => {
    this.setState({
      show: false,
      taskText: this.props.task
    })
  }

  handleShow = () => {
    this.setState({
      show: true
    })
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { dispatch } = this.context;
    dispatch({
      type: 'EDIT_BOOK',
      index: this.props.index,
      task: this.state.taskText,
      isDone: this.state.isDone
    })
    this.setState({
      show: false,
    })
  }

  changeStatus = () => {
    this.setState({
      isDone: !this.state.isDone
    })
  }

  render() {
    return (
      <>
        <div className="col-sm-4">
          <Button
            onClick={this.handleShow}
          >
            Edit
            </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>React Task Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleEdit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={this.state.taskText}
                  onChange={this.handleChange}
                  placeholder="Edit task"
                >
                </Form.Control>
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
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button onClick={this.handleEdit} className="btn btn-primary">
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditTask;