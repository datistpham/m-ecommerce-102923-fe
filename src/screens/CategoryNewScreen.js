import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import categoriesApi from '../api/categoryApi'

function CategoryNewScreen() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const { userInfo } = useSelector((state) => state.userLogin)
    const productAdd = useSelector((state) => state.productAdd)
    const { loading, error } = productAdd

    const errorMessage = error && error.response.data.message

    useEffect(() => {
        if (success) {
            //   dispatch({ type: PRODUCT_ADD_RESET })
            navigate('/admin/categories')
        }
    }, [success, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        const result = await categoriesApi.addCategory({ name })
        setSuccess(true)
        return result
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/admin/products'>
                Quay lại
            </Link>
            <FormContainer>
                <h1>Thêm thể loại mới</h1>
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                {success && <Message variant='success'>Thêm thành công</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Tên thể loại</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Nhập tên thể loại'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Xác nhận
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default CategoryNewScreen
