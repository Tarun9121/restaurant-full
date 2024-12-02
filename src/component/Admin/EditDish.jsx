import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getCategories, getDishById } from "../../service/dishService";

import { addDish, editDish } from "../../service/adminService";
import { useLocation } from "react-router-dom";

export default function EditDish() {
    const location = useLocation()

    const [dishId, setDishId] = useState(location.state.dishId);

    const [dish, setDish] = useState({
        name: '',
        description: '',
        foodCategory: '',
        isVeg: false,
        price: 0.0,
      });
    
      const [isVeg, setIsVeg] = useState(false);
      const [submitMessage, setSubmitMessage] = useState();
      const [errors, setErrors] = useState({});
      const [allCategories, setAllCategories] = useState([]);
      const [responseMsg, setResponseMsg] = useState();
    
      const handleDishChange = (event) => {
        const { name, value } = event.target;
        setDish((prevDish) => ({ ...prevDish, [name]: value }));
      };
    
      const handleIsVegChange = (event) => {
        setIsVeg(event.target.checked);
        setDish((prevDish) => ({ ...prevDish, isVeg: event.target.checked }));
      };
    
      const validateForm = () => {
        const newErrors = {};
        if (!dish.name) newErrors.name = 'Please enter dish name';
        if (!dish.description) newErrors.description = 'Please enter description';
        if (!dish.foodCategory) newErrors.foodCategory = 'Please select food category';
        if (!dish.price) {
          newErrors.price = 'Please enter price';
        } else {
          if (dish.price < 0) {
            newErrors.price = 'Price should not be negative';
          }
        }
        return newErrors;
      };

      async function handleGetDish() {
        try {
            const response = await getDishById(dishId)
            if(response.status == 200) {
                setDish(response.data);
            }
        } catch(error) {
            setResponseMsg("something went wrong")   
        }
      }
    
      async function handleGetCategories() {
        try {
          const response = await getCategories();
          if (response.status == 200) {
            setAllCategories(response.data);
          }
        } catch (error) {
          setAllCategories([]);
        }
      }
    
      useEffect(() => {
        handleGetDish();
        handleGetCategories();
      }, []);
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
          try {
            const response = await editDish(dish);
            if (response.status == 200) {
              setSubmitMessage('success');
            }
          } catch (error) {
            setSubmitMessage('error');
          }
        }
      };

    return (
        <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center">Add Dish</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Dish Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={dish.name}
                onChange={handleDishChange}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={dish.description}
                onChange={handleDishChange}
                isInvalid={errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Food Category:</Form.Label>
              <Form.Select
                name="foodCategory"
                value={dish.foodCategory}
                onChange={handleDishChange}
              >
                <option value="">Select Category</option>
                {Array.isArray(allCategories) && allCategories.length > 0 && (
                    
                  allCategories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))
                )}
              </Form.Select>
              {errors.foodCategory && <div className="text-danger">{errors.foodCategory}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isVeg"
                checked={isVeg}
                onChange={handleIsVegChange}
                label="Is Veg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={dish.price}
                onChange={handleDishChange}
                isInvalid={errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Dish
            </Button>
          </Form>

      {submitMessage != null ? (
        submitMessage == "success" ? (
          <div className="alert alert-success mt-3">
            Food Item updated successfully
          </div>
        ) : (
          <div className="alert alert-danger mt-3">
            Something went wrong
          </div>
        )
      ) : (
        <div></div>
      )}
    </Col>
  </Row>
</Container>
    );
}