import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    navigate('/homepage');
  };

  return (
    <LoginContainer>
      <h4 className="login-header">Setup an account to Use TourBlues!</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control type="text" placeholder="Enter artist name" />
          <Form.Text className="text-muted">
            *One artist name per user
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Phone (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone number (ex. 999-999-9999)"
          />
          <Form.Text className="text-muted">
            You can add a phone number to your profile later
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Instagram Handle (Optional)</Form.Label>
          <Form.Control type="text" placeholder="@johnjane-doe" />
          <Form.Text className="text-muted">
            You can add an IG handle to your profile later
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email (required)" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password (required)" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmitForm}>
          Submit
        </Button>
        <Form.Group />
      </Form>
    </LoginContainer>
  );
}

export default SignUpForm;

const LoginContainer = styled.div`
  width: 25%;
  margin-left: 20px;
  text-align: -webkit-auto;
`;
// const Form.Label = styled.div`
//   ju
// `
