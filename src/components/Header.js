import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { SocketContext } from '../SocketContainer'
import OrderDetails from './OrderDetails'
import PopupOrderDetail from './PopupOrderDetail'

function Header() {
  const dispatch = useDispatch()
  const [open, setOpen]= useState(false)
  const [newNotification, setNewNotification]= useState(false)
  const [listNotification, setListNotification]= useState([])
  const [listOrder, setListOrder]= useState([])
  const { socket } = useContext(SocketContext)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }
  
  useEffect(() => {
    console.log(userInfo)
    if (userInfo && userInfo.isAdmin && socket) {
      socket.on("new_order_to_admin", (data) => {
        console.log(data)
        setListOrder(prev=> ([...prev, data]))
        setListNotification(prev=> ([...prev, {message: `Bạn có ${data.data.orderItems.length} đơn hàng mới`, ...data}]))
        setNewNotification(true)
        // openSnackbar('Bạn có một đơn hàng mới')
      })
    }

  }, [userInfo, socket])

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>YCommerce</Navbar.Brand>
          </LinkContainer>
          <SearchBox/>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Giỏ hàng
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Quản lý' id='adminmenu'>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>Người dùng</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/categories'>
                    <NavDropdown.Item>Thể loại</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown onClick={()=> setNewNotification(false)} title={<i style={{color: newNotification ? "red" : "unset"}} className="fa-solid fa-bell"></i>} id='adminmenu'>
                  {listNotification.map((item, key)=> <LinkContainer key={key} to='/admin/orders'>
                    <NavDropdown.Item>
                      <NavDropdown.Item onClick={()=> setOpen(true)}>{item.message}</NavDropdown.Item>
                      {/* <OrderDetails order={item} /> */}
                      <NavDropdown.Item>
                        <PopupOrderDetail order={item} open={open} setOpen={setOpen} />
                      </NavDropdown.Item>
                    </NavDropdown.Item>
                  </LinkContainer>)}   
                </NavDropdown>
              )}
              {userInfo && Object.keys(userInfo).length !== 0 ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Tài khoản</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Đăng nhập
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </header>
  )
}

export default Header
