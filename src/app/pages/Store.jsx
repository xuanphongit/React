import { useParams } from "react-router"
import { useEffect, useState } from "react"
import MenuItemList from "./../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useSelector } from "react-redux"
import shopApi from "../api/shopApi"
import cartApi from "../api/cartApi"
import useToast from "../hooks/useToast"
import { startConnection } from "../signalr/signalr"
import { HubConnectionUrl, HubMethod } from "../signalr/hubConstants"

const Store = () => {
  const { toastError } = useToast()
  const { shopId, cartId } = useParams()

  const [items, setItems] = useState([])
  const [shopName, setshopName] = useState("")
  const [cart, setCart] = useState({})
  const [isHost, setIsHost] = useState(false)
  const [currentCartId, setCartId] = useState(0)

  const [cartHubConnection, setCartHubConnection] = useState(null)
  const [shopHubConnection, setShopHubConnection] = useState(null)

  const userInfor = useSelector(state => state.SignIn)
  const customerId = userInfor.signInInfor.customerId

  const postData = {
    ShopId: shopId,
    CustomerId: customerId,
  }

  useEffect(() => {
    // get items in shop
    loadShop()

    // get cart
    loadCart()
  }, [])

  const loadCart = () => {
    // guest
    if (cartId) {
      setIsHost(false)
      setCartId(cartId)
      cartApi
        .GetCartById(cartId)
        .then(response => {
          setCart(response.data)
          connectCartHub(cartId)
        })
        .catch(error => {
          toastError(error)
        })
    } else {
      // host
      setIsHost(true)
      customerId &&
        cartApi
          .GetExistCart(postData)
          .then(response => {
            if (response && response.data) {
              setCart(response.data)
              setCartId(response.data.cartId)
              connectCartHub(response.data.cartId)
            } else {
              cartApi.CreateCart(postData).then(response => {
                setCart(response.data)
                setCartId(response.data.cartId)
                connectCartHub(response.data.cartId)
              })
            }
          })
          .catch(error => {
            toastError(error)
          })
    }
  }

  const loadShop = () => {
    shopApi
      .getShopInforById(shopId)
      .then(response => {
        setItems(response.data.items.filter(a => a.isActive))
        setshopName(response.data.name)
        connectShopHub(shopId)
      })
      .catch(error => {
        toastError(error)
      })
  }

  const connectCartHub = cartId => {
    if (!cartHubConnection) {
      const cartHub = `${HubConnectionUrl.CartHub}${cartId}`
      const hubConnection = startConnection(cartHub)
      setCartHubConnection(hubConnection)
    }
    if (cartHubConnection) {
      cartHubConnection.on(HubMethod.AddItemToCart, response => {
        if (response && response.customerId != customerId) {
          loadCart()
        }
      })

      cartHubConnection.on(HubMethod.RemoveItemFromCart, response => {
        if (response && response.customerId != customerId) {
          loadCart()
        }
      })
    }
  }

  const connectShopHub = shopId => {
    if (!shopHubConnection) {
      const shopHub = `${HubConnectionUrl.ShopHub}${shopId}`
      const hubConnection = startConnection(shopHub)
      setShopHubConnection(hubConnection)
    }
  }

  const deleteItem = id => {
    cartApi
      .RemoveItemFromCart({
        itemId: id,
        customerId: customerId,
        cartId: currentCartId,
      })
      .then(response => {
        loadCart()
      })
      .catch(error => {
        toastError(error)
      })
  }

  const addToCart = id => {
    cartApi
      .AddItemToCart({
        itemId: id,
        customerId: customerId,
        cartId: currentCartId,
      })
      .then(response => {
        loadCart()
      })
      .catch(error => {
        toastError(error)
      })
  }

  return (
    <>
      <Header size="medium">{shopName}</Header>
      <Grid>
        <Grid.Column width={12}>
          {items && (
            <MenuItemList items={items} addToCart={addToCart}></MenuItemList>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Cart cart={cart} deleteItem={deleteItem}></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Store
