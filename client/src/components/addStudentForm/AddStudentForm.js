import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddStudentSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name Is Required'),
  lastName: Yup.string().required('Last Name Is Required'),
  email: Yup.string().required('Email Is Required'),
  timeZone: Yup.string().required('Time Zone Is Required'),
  zoomLink: Yup.string().required('Zoom Link Is Required')
});

class AddStudentForm extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            timeZone: '',
            zoomLink: ''
          }}
          validationSchema={AddStudentSchema}
          onSubmit={(values, formikBag) => {
            axios
              .post('/api/addStudent', {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                timeZone: values.timeZone,
                zoomLink: values.zoomLink,
                userId: this.props.user.id
              })
              .then(res => {
                formikBag.resetForm();
                this.props.closeModal();
                this.props.addStudent(res.data);
              })
              .catch(err => console.log(err));
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              <ErrorMessage
                name="firstName"
                component="small"
                className="form-text text-muted"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" />
              <ErrorMessage
                name="lastName"
                component="small"
                className="form-text text-muted"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" />
              <ErrorMessage
                name="email"
                component="small"
                className="form-text text-muted"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeZone">Time Zone</label>
              <Field name="timeZone" type="text" />
              <ErrorMessage
                name="timeZone"
                component="small"
                className="form-text text-muted"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zoomLink">Zoom Link</label>
              <Field name="zoomLink" type="text" />
              <ErrorMessage
                name="zoomLink"
                component="small"
                className="form-text text-muted"
              />
            </div>
            <button className="btn btn-info" type="submit">
              Add Student
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default AddStudentForm;
