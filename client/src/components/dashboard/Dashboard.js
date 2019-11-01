import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
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
        {this.state.students.map(student => (
          <p key={student.id}>{student.firstName}</p>
        ))}
      </div>
    );
  }
}

export default Dashboard;
