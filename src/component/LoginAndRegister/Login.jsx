import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateLogin } from '../../service/userService';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    mobileNo: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user,
         [name]: value 
    });
    setErrors({})
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.mobileNo) newErrors.mobileNo = 'Please enter mobile number';
    else if (!/^[0-9]{10}$/.test(user.mobileNo))
      newErrors.mobileNo = 'Invalid mobile number';
    if (!user.password) newErrors.password = 'Please enter password';
    else if (user.password.length < 4)
      newErrors.password = 'Password must be at least 4 characters long';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await validateLogin(user);
        if(response.status == 200) {
            localStorage.setItem("userId", response.data.id)
            localStorage.setItem("role", response.data.role);
            navigate("/home");
        }
      } catch(error) {
        setResponseMessage("Invalid crediantals");
      }
      console.log('Form submitted:', user);
    }
  };

  return (
    <div>
        {
            responseMessage && <div className="bg-red-50 text-center p-3">{responseMessage}</div>
        }
      <h2>Login Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Mobile Number:</Form.Label>
          <Form.Control
            type="text"
            name="mobileNo"
            value={user.mobileNo}
            onChange={handleChange}
            isInvalid={errors.mobileNo}
          />
          <Form.Control.Feedback type="invalid">{errors.mobileNo}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;