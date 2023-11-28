import { Routes as ReactRoutes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'
import CartScreen from '../screens/CartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PaymentScreen from '../screens/PaymentScreen'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'
import OrderDetailsScreen from '../screens/OrderDetailsScreen'
import UserListScreen from '../screens/UserListScreen'
import UserEditScreen from '../screens/UserEditScreen'
import ProductList from '../screens/ProductList'
import OrderListScreen from '../screens/OrderListScreen'
import ProductNewScreen from '../screens/ProductNewScreen'
import ProductEditScreen from '../screens/ProductEditScreen'
import CategoriesList from '../screens/CategoriesList'
import CategoryNewScreen from '../screens/CategoryNewScreen'
import CategoryEditScreen from '../screens/CategoryEditScreen'
import { useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { SocketContext } from '../SocketContainer'
import { useSnackbar } from 'react-simple-snackbar'

function Routes() {
  const [openSnackbar, closeSnackbar] = useSnackbar({position: "bottom-left"}, 10000)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { socket } = useContext(SocketContext)
  useEffect(() => {
    console.log(userInfo)
    if (userInfo && userInfo.isAdmin && socket) {
      socket.on("new_order_to_admin", (data) => {
        console.log(data.data.orderItems.length)
        openSnackbar(`Bạn có ${data.data.orderItems.length} đơn hàng mới`)
      })
    }

  }, [userInfo, socket])

  return (
    <>
      <ReactRoutes>
        <Route path='/' element={<HomeScreen />} exact />
        <Route path='/search/:keyword' element={<HomeScreen />} />
        <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
        <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />

        <Route path='/products/:id' element={<ProductScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/cart/:id' element={<CartScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderDetailsScreen />} />

        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />

        <Route path='/admin/users' element={<UserListScreen />} />
        <Route path='/admin/users/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/products/search/:keyword' element={<ProductList />} />
        <Route path='/admin/products/page/:pageNumber' element={<ProductList />} />
        <Route path='/admin/products/search/:keyword/page/:pageNumber' element={<ProductList />} />
        <Route path='/admin/products/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/products/add' element={<ProductNewScreen />} />
        <Route path="/admin/categories" element={<CategoriesList />} />
        <Route path="/admin/category/add" element={<CategoryNewScreen />} />
        <Route path="/admin/categories/:id/edit" element={<CategoryEditScreen />} />
        <Route path='/admin/orders' element={<OrderListScreen />} />
      </ReactRoutes>
    </>
  )
}

export default Routes
