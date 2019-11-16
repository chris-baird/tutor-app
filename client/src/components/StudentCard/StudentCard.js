import React, { useState } from 'react';
import {
  Collapse,
  Button,
  CardBody,
  Card,
  CardTitle,
  CardText,
  CardSubtitle
} from 'reactstrap';

const StudentCard = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
      <Card>
        <CardBody>
          <CardTitle>{`${props.student.firstName} ${props.student.lastName}`}</CardTitle>
          <CardSubtitle>
            <Button
              color="primary"
              onClick={toggle}
              style={{ marginBottom: '1rem' }}
            >
              View Details
            </Button>
            <Button color="secondary" style={{ marginBottom: '1rem' }}>
              Send Email
            </Button>
          </CardSubtitle>

          <Collapse isOpen={isOpen}>
            <Card>
              <p>
                Name: {`${props.student.firstName} ${props.student.lastName}`}
              </p>
              <p>Email: {props.student.email}</p>
              <p>Time Zone: {props.student.timeZone}</p>
              <p>Zoom Link: {props.student.zoomLink}</p>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentCard;
