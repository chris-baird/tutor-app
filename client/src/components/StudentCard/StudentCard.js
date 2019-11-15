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
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <Card>
        <CardBody>
          <CardTitle>{props.studentName}</CardTitle>
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
              <CardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Nihil anim keffiyeh
                helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident.
              </CardBody>
            </Card>
          </Collapse>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentCard;
