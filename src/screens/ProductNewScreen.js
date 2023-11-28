import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { addProduct } from '../actions/productActions'
import { PRODUCT_ADD_RESET } from '../constants/productConstants'
import uploadApi from '../api/uploadApi'
import categoriesApi from '../api/categoryApi'

function NewProductScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [categoryId, setCategoryId]= useState('')
  const [price, setPrice] = useState(10000)
  const [countInStock, setCountInStock] = useState(0)
  const [listCategory, setListCategory] = useState([])

  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const productAdd = useSelector((state) => state.productAdd)
  const { loading, error, success } = productAdd

  const errorMessage = error && error.response.data.message
  const getListCategory = async () => {
    const result = await categoriesApi.getListCategories(8)
    console.log(result)
    setListCategory(result.categories)
  }
  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_ADD_RESET })
      navigate('/admin/products')
    }
  }, [success, navigate, dispatch])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getListCategory()
    } else {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    setUploadError(false)

    try {
      const data = await uploadApi.uploadImage(formData, userInfo.token)
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
      setUploadError('Lỗi khi tải ảnh lên')
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addProduct({ name, image, description, category, brand, price, countInStock, categoryId }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/products'>
        Quay lại
      </Link>
      <FormContainer>
        <h1>Thêm sản phẩm mới</h1>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập tên sản phẩm'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập đường dẫn'
              value={image}
              required
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type='file' onChange={uploadFileHandler} />
            {uploading && <Loader />}
            {uploadError && <Message className="mt-2" variant='danger'>{uploadError}</Message>}
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Mô tả sản phẩm</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Nhập mô tả'
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Thể loại</Form.Label>
            <Form.Select onChange={(e) => setCategoryId(e.target.value)} aria-label="Default select example">
              <option>Chọn thể loại</option>
              {listCategory?.map((item, key) => <option key={key} value={item._id}>{item.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Phân loại</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập phân loại'
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Thương hiệu</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập thương hiệu'
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>{`Giá (vnđ)`}</Form.Label>
            <Form.Control
              type='number'
              placeholder='Nhập giá sản phẩm'
              value={price}
              required
              step='1000'
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type='number'
              placeholder='Nhập số lương'
              value={countInStock}
              required
              onChange={(e) => setCountInStock(e.target.value)}
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

export default NewProductScreen
