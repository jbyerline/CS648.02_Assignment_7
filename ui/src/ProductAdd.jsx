import React from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      price: '$',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      name, price, category, imageUrl,
    } = document.forms.productAdd;
    const priceWithoutDollar = price.value.substring(1); // Getting value without '$'

    const product = {
      name: name.value,
      price: parseFloat(priceWithoutDollar),
      category: category.value,
      imageUrl: imageUrl.value,
    };
    const { addProduct } = this.props;
    addProduct(product);

    // Resetting the Form to initial value
    name.value = '';
    category.value = 'Shirts';
    imageUrl.value = '';
    this.setState({ price: '$' });
  }

  handlePriceChange(event) {
    const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
    this.setState({ price: `$${priceWithoutDollar}` });
  }

  render() {
    const { price } = this.state;
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Price Per Unit</Form.Label>
          <Form.Control type="text" placeholder="0.00" value={price} onChange={this.handlePriceChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Gucci Jeans" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="https://www.amazon.com" />
        </Form.Group>
        <Button variant="dark" type="submit" onClick={this.handleSubmit}>
          Add Product
        </Button>
      </Form>
    );
  }
}
