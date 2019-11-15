import React, { Component } from 'react';
import AddStudentForm from '../addStudentForm/AddStudentForm';
import StudentCard from '../StudentCard/StudentCard';
import axios from 'axios';
import { Button } from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      user: {}
    };
    this.handleAddStudent = this.handleAddStudent.bind(this);
  }

  handleAddStudent(newStudent) {
    const students = [...this.state.students, newStudent];
    this.setState({ students: students });
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
        <AddStudentForm
          user={this.props.user}
          addStudent={this.handleAddStudent}
        />
        <div className="row">
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
