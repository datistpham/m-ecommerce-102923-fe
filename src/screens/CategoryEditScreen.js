import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import categoriesApi from '../api/categoryApi'

function CategoryEditScreen() {
    const navigate = useNavigate()
    const params = useParams()
    const [category, setCategory] = useState()
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.userLogin)
    const productDetails = useSelector((state) => state.productDetails)
    const { product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading, error } = productUpdate
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                const result = await categoriesApi.getCategoryById(params.id)
                setCategory(result.categories)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [params.id])
    useEffect(() => {
        if (category) {
            console.log(category)
            setName(category.name)
        }

    }, [category])

    const errorMessage = error && error.response.data.message

    const submitHandler = async (e) => {
        e.preventDefault()
        const result = await categoriesApi.updateCategory(params.id, { name })
        console.log(result)
        setSuccess(true)
        return result
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/admin/categories'>
                Quay lại
            </Link>
            <FormContainer>
                <h1>Chỉnh sửa thể loại</h1>
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                {success && <Message variant='success'>Cập nhật thông tin thành công</Message>}
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

export default CategoryEditScreen
