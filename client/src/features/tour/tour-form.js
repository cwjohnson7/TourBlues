import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTourThunk } from '../homepage/HomePageSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const TourForm = () => {
  const dispatch = useDispatch();
  const [tourName, setTourName] = useState('');
  const [show, setShow] = useState(false);
  const artistId = '64f92397aa11269c12b9c746';
  const tours = useSelector((state) => state.homePage.tours)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTourName = (e) => {
    e.preventDefault()
    setTourName(e.target.value)
  }
  const handleSubmitForm = (data) => {
    //determine how to define name || artistId can be pulled from authSlice eventually, declared here for now
    handleClose();
    console.log('data from submit: ', {data: {name: tourName, artistId}});
    dispatch(addTourThunk({data: {name: tourName, artistId }}));
  }

  return (
    <>
    <TourCard>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Create a Tour</Card.Title>
          <Card.Text>
            Kickoff your tour with the initial details here!
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>Create Tour</Button>
        </Card.Body>
      </TourCard>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Tour</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Row className="mb-3">
          <Form>
<Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Tour Name</Form.Label>
              <Form.Control type="text" placeholder="Enter tour name" onChange={handleTourName} />
              </Form.Group>
              <FormButton onClick={handleSubmitForm} variant="primary" type="button">
            Add Tour
          </FormButton>
              </Form>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    </>
  );
}

export default TourForm;

const TourCard = styled(Card)`
height: 200px;
margin-left: 20px;
margin-right: 20px;
`
const FormButton = styled(Button)`
margin-top: 20px;
`