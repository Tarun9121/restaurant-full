import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { registerUser } from '../../service/userService';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    mobileNo: '',
    email: '',
    role: 'CUSTOMER',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user,
         [name]: value 
    });
    setErrors({})
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = 'Please enter name';
    if (!user.email) newErrors.email = 'Please enter email';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email))
      newErrors.email = 'Invalid email';
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
        const response = await registerUser(user);
        if(response.status == 200) {
            setResponseMessage("success")
        }
      } catch(error) {
        setResponseMessage("failed")
      }
      console.log('register Form submitted:', user);
    }
  };

  return (
    <div>
        {
            responseMessage && 
            responseMessage == "success" ? <div className="bg-green-50 p-3 text-center">Account created successfully</div> :
            responseMessage == "failed" ? <div className="bg-green-50 p-3 text-center">Account creation failed</div> : 
            <div></div>
        }
      <h2>Register Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile No:</Form.Label>
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
          Already have an account? <Link to="/">Login here</Link>
        </p>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;