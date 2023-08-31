import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();  

  const handleSubmitForm = (e) => {
    e.preventDefault();

    navigate("/")

  }

  return (
    <LoginContainer>
    <h4 className="login-header">Setup an account to Use TourBlues!</h4>
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      
        <Button variant="primary" type="submit" onClick={handleSubmitForm}>
          Submit
        </Button>
        <Form.Group>  
          <Form.Text className="text-muted">
            (You will be redirected to login after submitting.)
          </Form.Text>
        </Form.Group>


    </Form>
    
    </LoginContainer>
  );
}

export default SignUpForm;

const LoginContainer = styled.div`
  width: 25%;
  margin-left: 20px;
  text-align: -webkit-auto;

`
// const Form.Label = styled.div`
//   ju
// `