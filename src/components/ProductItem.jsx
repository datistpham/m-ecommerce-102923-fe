import React from 'react';

const ProductItem = ({ product, name, image, price, countInStock, qty }) => {
  return (
    <div className="product-item">
      <img style={{width: 50}} src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: {price} VND</p>
      <p>In Stock: {countInStock}</p>
      <p>Quantity: {qty}</p>
    </div>
  );
};

export default ProductItem;
