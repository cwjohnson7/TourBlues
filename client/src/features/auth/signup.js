import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { signUp } from './authSlice';

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  artistName: Yup.string().required(),
  handle: Yup.string().optional(),
  phone: Yup.string().optional(),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    console.log('data from formSubmit: ', data);
    dispatch(
      signUp({
        data,
        callback: () => {
          navigate('/homepage');
        },
      })
    );
  };
  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <LoginContainer>
      <h4 className="login-header">Setup an account to Use TourBlues!</h4>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            {...register('firstName', { required: true })}
            placeholder="Enter first name"
          />
          {errors.firstName?.message}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            {...register('lastName', { required: true })}
            placeholder="Enter last name"
          />
          {errors.lastName?.message}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control
            type="text"
            name="artistName"
            {...register('artistName', { required: true })}
            placeholder="Enter artist name"
          />
          <Form.Text className="text-muted">
            *One artist name per user
          </Form.Text>
          {errors.artistName?.message}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPhone">
          <Form.Label>Phone (Optional)</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            {...register('phone', { required: false, optional: true })}
            placeholder="Phone number (ex. 999-999-9999)"
          />
          <Form.Text className="text-muted">
            You can add a phone number to your profile later
          </Form.Text>
          {errors.phone?.message}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instagram Handle (Optional)</Form.Label>
          <Form.Control
            type="text"
            name="handle"
            {...register('handle', { required: false, optional: true })}
            placeholder="@johnjane-doe"
          />
          <Form.Text className="text-muted">
            You can add a handle to your artist profile later
          </Form.Text>
          {errors.handle?.message}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            {...register('email', { required: true })}
            placeholder="Enter email (required)"
          />
          {errors.email?.message}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...register('password', { required: true })}
            placeholder="Password (required)"
          />
          {errors.password?.message}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <BackButton
          variant="secondary"
          type="button"
          onClick={handleBackButton}
        >
          Back
        </BackButton>
        <Form.Group />
      </Form>
    </LoginContainer>
  );
};

export default SignUpForm;

const LoginContainer = styled.div`
  width: 25%;
  margin-left: 20px;
  text-align: -webkit-auto;
`;

const BackButton = styled(Button)`
  margin-left: 10px;
`;
// const Form.Label = styled.div`
//   ju
// `
