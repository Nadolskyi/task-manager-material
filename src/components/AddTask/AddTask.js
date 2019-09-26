import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import { ListContext } from '../../contexts/ListContext';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormGroup
} from '@material-ui/core';

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
      <Row>
        <div className="col-sm-8">
          <h3 className="AddTask-header">React Task Manager</h3>
        </div>
        <div className="col-sm-4">
          <Button variant="contained" color="primary" onClick={this.handleShow}>Add</Button>
        </div>
        <Dialog open={this.state.show}>
          <DialogTitle> React Task Manager </DialogTitle>
          <DialogContent>
            <FormGroup onSubmit={this.handleAdd}>
              <TextField
                type="text"
                value={this.state.taskText}
                onChange={this.handleChange}
                id="inputTask"
                placeholder="Enter task to add"
              />
              <Checkbox
                value={this.state.isDone}
                onChange={this.changeStatus.bind(this)}
              >
                {this.state.isDone ? "Move to active" : "Checked as done"}
              </Checkbox>
            </FormGroup >
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleAdd} className="btn btn-primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Row>
    );
  }
}

export default AddTask;