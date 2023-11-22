import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from './Product'
import axios from 'axios'
import apiConfig from '../api/apiConfig'

const RecommendProduct = () => {
    const [products, setProducts] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")) : {};
    useEffect(() => {
        (async () => {
            const res = await axios({
                url: apiConfig.baseUrl + "api/recommendation",
                method: "get",
                headers: {
                    "Authorization": "Bearer " + userInfo.token
                }

            })
            const result = await res.data
            console.log(result)
            setProducts(result)
            return result
        })()
    }, [userInfo.token])
    return (
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    )
}

export default RecommendProduct
