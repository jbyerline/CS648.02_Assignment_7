/* global db */
/* eslint no-restricted-globals: "off" */

db.products.deleteMany({});
db.deleted_products.remove({});

const initialProducts = [
  {
    id: 1,
    name: 'Lucky',
    category: 'Jeans',
    price: '69.99',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0259/7588/1814/products/JU9T1NKNT28-26_3_720x.png?v=1630516412',
  },
  {
    id: 2,
    name: 'Columbia',
    category: 'Shirts',
    price: '42.00',
    imageUrl: 'https://columbia.scene7.com/is/image/ColumbiaSportswear2/1577051_335_f?wid=768&hei=806&v=1642418206',
  },
];

db.products.insertMany(initialProducts);
const count = db.products.countDocuments();

db.counters.deleteOne({ _id: 'products' });
db.counters.insertOne({ _id: 'products', uid: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ category: 1 });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
