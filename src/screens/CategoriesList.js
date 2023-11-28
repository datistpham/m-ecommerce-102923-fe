import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Table, Button, Modal, Image } from 'react-bootstrap'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'
import { listProducts, deleteProductById } from '../actions/productActions'
import categoriesApi from '../api/categoryApi'

function CategoriesList() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pages = 8
    const [category, setCategory] = useState([])
    const { userInfo } = useSelector((state) => state.userLogin)
    const { success: deleteSuccess } = useSelector((state) => state.productDelete)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            getListCategory()
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate, deleteSuccess, params])

    const [selectedProduct, setSelectedProduct] = useState('')

    const [show, setShow] = useState(false)

    const closeModalHandler = () => setShow(false)
    const confirmDeleteUser = (product) => {
        setShow(true)
        setSelectedProduct(product)
    }

    const deleteHandler = async (product) => {
        setShow(false)
        const result = await categoriesApi.deleteCategory(product._id)
        window.location.reload()
        return result
    }

    const reloadProductList = () => {
        window.location.reload()
    }

    const getListCategory = async () => {
        const result = await categoriesApi.getListCategories(8)
        console.log(result)
        setCategory(result.categories)
    }

    return (
        <>
            <Row className='justify-content-between'>
                <Col md={11}>
                    <h1>Danh sách thể loại</h1>
                    <LinkContainer to={'/admin/category/add'}>
                        <Button className='mb-4'>Thêm thể loại</Button>
                    </LinkContainer>
                </Col>
                <Col md={1} className='d-flex justify-content-end align-items-center'>
                    <i className='fa-solid fa-rotate' role='button' onClick={reloadProductList}></i>
                </Col>
            </Row>
            <SearchBox isAdmin={true} />

            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Tên Thể loại</th>
                            <th>Chỉnh sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>
                                    <LinkContainer to={`/admin/categories/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => confirmDeleteUser(product)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate page={1} keyword={params.keyword ? params.keyword : ''} isAdmin={true} />
                {category.length === 0 && <Message variant='danger'>Không tìm thấy kết quả phù hợp</Message>}
            </>
            <Modal show={show} onHide={closeModalHandler} centered backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa thể loại</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Bạn có muốn xóa thể loại <b>{selectedProduct.name}</b> không?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModalHandler}>
                        Đóng
                    </Button>
                    <Button variant='primary' onClick={() => deleteHandler(selectedProduct)}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CategoriesList
