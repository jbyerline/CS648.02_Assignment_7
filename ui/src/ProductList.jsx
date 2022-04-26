import React from 'react';
import { Spinner } from 'react-bootstrap';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [], count: 0, initialLoading: true };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `
            query {
                productList {
                    id
                    name
                    category
                    price
                    imageUrl
                }
                count
            }
        `;

    const data = await graphQLFetch(query);

    if (data) {
      this.setState({ products: data.productList, count: data.count, initialLoading: false });
    }
  }

  async addProduct(product) {
    const query = `
            mutation addProduct($product: ProductInputs!) {
                addProduct(product: $product) {
                    id
                }
            }
        `;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }
  }

  async deleteProduct(index) {
    const query = `mutation deleteProduct($id: Int!) {
      deleteProduct(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];

    const data = await graphQLFetch(query, { id });
    if (data && data.deleteProduct) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { products, count, initialLoading } = this.state;
    return (
      <React.Fragment>
        <div className="root-container">
          <h2>The Best Company Inventory Ever...</h2>
          <p>
            (Because its made with React Bootstrap
            and it has
            <strong> SPINNERS </strong>
            :p)
          </p>
          <div className="spinner-div">
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" style={{ color: 'deeppink' }} />
            <Spinner animation="border" variant="dark" />
          </div>
          <div>
            Showing
            {' '}
            {count}
            {' '}
            available products:
          </div>
          <hr />
          <ProductTable
            headings={productTableHeadings}
            products={products}
            loading={initialLoading}
            deleteProduct={this.deleteProduct}
          />
          <div>Add a new Product</div>
          <hr />
          <ProductAdd addProduct={this.addProduct} />
        </div>
      </React.Fragment>
    );
  }
}
