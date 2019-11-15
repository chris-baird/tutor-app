import React, { Component } from 'react';
import AddStudentForm from '../addStudentForm/AddStudentForm';
import StudentCard from '../StudentCard/StudentCard';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      user: {},
      modal: false
    };
    this.handleAddStudent = this.handleAddStudent.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  handleAddStudent(newStudent) {
    const students = [...this.state.students, newStudent];
    this.setState({ students: students });
  }

  handleModalToggle() {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.user.id}/students`)
      .then(students => {
        this.setState({ students: students.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <hr />
        <button className="btn btn-info m-1" onClick={this.handleModalToggle}>
          Add Student
        </button>
        <button className="btn btn-info m-1">Create Email</button>
        <button className="btn btn-info m-1">Send Weekly Email</button>
        <Modal
          isOpen={this.state.modal}
          centered={true}
          toggle={this.handleModalToggle}
        >
          <ModalHeader toggle={this.handleModalToggle}>Add Student</ModalHeader>
          <ModalBody>
            <AddStudentForm
              user={this.props.user}
              addStudent={this.handleAddStudent}
              closeModal={this.handleModalToggle}
            />
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        {/* <AddStudentForm
          user={this.props.user}
          addStudent={this.handleAddStudent}
        /> */}
        <div className="row mt-3">
          {this.state.students.map(student => (
            <StudentCard
              studentName={`${student.firstName} ${student.lastName}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
