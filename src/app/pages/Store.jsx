import { useParams } from "react-router"
import { useEffect, useState } from "react"
import MenuItemList from "./../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useSelector } from "react-redux"
import shopApi from "../api/shopApi"
import cartApi from "../api/cartApi"
import useToast from "../hooks/useToast"



const Store = () => {
  const { toastError } = useToast()
  const { id } = useParams()
  const [items, setItems] = useState([])
  const [cart, setCart] = useState({})
  const userInfor = useSelector(state => state.SignIn)
  const customerId = userInfor.signInInfor.customerId
  const postData = {
    ShopId: id,
    CustomerId: customerId
  }

  const RefreshCart = () => {
    // get existed cart, if not existed => create new cart
    customerId && cartApi.GetExistCart(postData).then(response => {
      if (response && response.data) {
        setCart(response.data)
      } else {
        cartApi.CreateCart(postData).then(response => {
          setCart(response.data)
        })
      }
    }).catch(error => {
      toastError(error)
    })
  }

  useEffect(() => {

    // get items in shop
    shopApi.getShopInforById(id).then(response => {
      setItems(response.data.items)
    }).catch(error => {
      toastError(error)
    })

    RefreshCart()
  }, [])

  const addToCart = id => {
    cartApi.AddItemToCart({
      itemId: id,
      customerId: customerId,
      cartId: cart.cartId
    }).then(response => {
      RefreshCart()
    }).catch(error => {
      toastError(error)
    })
  }

  return (
    <>
      <Header size="medium">Shop {id}</Header>
      <Grid>
        <Grid.Column width={12}>
          {items && (
            <MenuItemList items={items} addToCart={addToCart}></MenuItemList>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Cart cart={cart}></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Store
