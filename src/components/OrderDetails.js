import React from 'react';

import ProductItem from './ProductItem';
import UserItem from './UserItem';

const OrderDetails = ({ order }) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, user } = order.data;

    return (
        <div className="container mt-4" style={{maxHeight: 600, overflow: "auto"}}>
            <h2 className="mb-4">Order Details</h2>

            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Products</h3>
                        {orderItems.map((product, index) => (
                            <ProductItem key={index} {...product} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Shipping Address</h3>
                            <p><strong>Address:</strong> {shippingAddress.address}</p>
                            <p><strong>City:</strong> {shippingAddress.city}</p>
                            <p><strong>Country:</strong> {shippingAddress.country}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row">

                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">User order</h3>
                            <UserItem {...user} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body">
                    <h3 className="card-title">Payment Method</h3>
                    <p><strong>{paymentMethod}</strong></p>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h3 className="card-title">Order Summary</h3>
                    <p><strong>Items Price:</strong> {itemsPrice} VND</p>
                    <p><strong>Shipping Price:</strong> {shippingPrice} VND</p>
                    <p><strong>Total Price:</strong> {totalPrice} VND</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
