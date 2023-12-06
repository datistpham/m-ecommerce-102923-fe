import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import CategoryFilter from '../components/CategoryFilter'
import ProductCarousel from '../components/ProductCarousel'
import RecommendProduct from '../components/RecommendProduct'
import CategoryProduct from '../components/CategoryProduct'
import Fuse from "fuse.js"

function HomeScreen(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const searchParams= useSearchParams()
  const location = useLocation()
  const [searchList, setSearchList]= useState([])
  const keyword = params.keyword
  const category = params.keyword
  const queryString= searchParams[0].get("query")
  console.log("query string",  queryString)
  let pageNumber = params.pageNumber || 1
  const fuseOptions = {
    keys: [
      "name",
      "category",
      "brand"
    ]
  };
  

  const productList = useSelector((state) => state.productList)
  const [searchProductList, setSearchProductList] = useState([])
  const { loading, error, products, pages, page } = productList
  const [initProduct, setInitProduct] = useState(products)
  const fuse = new Fuse(initProduct, fuseOptions);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category))
  }, [dispatch, keyword, category, pageNumber])

  useEffect(() => {
    setInitProduct(products)
  }, [products])

  useEffect(()=> {
    if(props?.is_search_page=== true) {
      const searchResult= fuse.search(queryString)
      // console.log(searchResult.map(item=> ({...item.item})))
      setSearchList(searchResult.map(item=> ({...item.item})))
    }
  // eslint-disable-next-line
  }, [props?.is_search_page, queryString])

  return (
    <>
      <Meta />
      {keyword ? (
        <Link className='btn btn-light my-3' to='/'>
          Quay lại
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {props?.is_search_page === true &&
        <>

          <h1>Tìm kiếm sản phẩm: </h1>
          <>
            {searchList.length === 0 && (
              <Message variant='danger'>Không tìm thấy kết quả phù hợp</Message>
            )}
            <Row>
              {searchList.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        </>
      }
      <h1>Đề xuất sản phẩm</h1>
      <RecommendProduct />
      <h1>Phân loại sản phẩm</h1>
      <CategoryProduct />
      <h1>Danh sách sản phẩm</h1>
      <CategoryFilter />
      {loading ? (
        <Loader customStyle={{ marginBottom: "500px" }} />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          {products.length === 0 && (
            <Message variant='danger'>Không tìm thấy kết quả phù hợp</Message>
          )}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  )
}

export default HomeScreen
