import { useParams, useHistory } from "react-router"
import { useEffect, useState } from "react"
import MenuItemList from "./../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useDispatch, useSelector } from "react-redux"
import shopApi from "../api/shopApi"
import cartApi from "../api/cartApi"
import orderApi from "../api/orderApi"
import useToast from "../hooks/useToast"
import { getHubConnection } from "../signalr/signalr"
import { HubConnectionUrl, HubMethod } from "../signalr/hubConstants"
import { Constants } from "../helpers/constants"
import { setCartHubConnection } from "./SignIn/signInSlice"

const Store = () => {
  const { toastError, toastSuccess } = useToast()
  const { shopId, cartId } = useParams()
  const [items, setItems] = useState([])
  const [shopName, setshopName] = useState("")
  const [cart, setCart] = useState({})
  const [isHost, setIsHost] = useState(false)
  const [currentCartId, setCartId] = useState(0)
  const userInfor = useSelector(state => state.SignIn)
  const customerId = userInfor.signInInfor.customerId
  const cartHubConnection = Object.assign({}, userInfor.cartHubConnection); 
  const postData = {
    ShopId: shopId,
    CustomerId: customerId,
  }
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    // get items in shop
    loadShop()

    // get cart
    loadCart()
  }, [])

  const loadCart = request => {
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
      })
      .catch(error => {
        toastError(error)
      })
  }

  const connectCartHub = cartId => {
    if (cartHubConnection.cartId != cartId) {
      const cartHub = `${HubConnectionUrl.CartHub}${cartId}`
      const hubConnection = getHubConnection(cartHub, cartNotifyHandle)
      cartHubConnection.cartId = cartId
      cartHubConnection.hubConnection = hubConnection
      dispatch(setCartHubConnection(cartHubConnection))
    }
  }

  const cartNotifyHandle = cartHubConnection => {
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

    cartHubConnection.on(HubMethod.SubmitItems, response => {
      if (response && response.customerId != customerId) {
        loadCart()
      }
    })

    cartHubConnection.on(HubMethod.UnsubmitItems, response => {
      if (response && response.customerId != customerId) {
        loadCart()
      }
    })

    cartHubConnection.on(HubMethod.NewOrder, response => {
      if (response && response.customerId != customerId && !isHost) {
        history.push("/store")
      }
    })
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
        const { itemId, errorMessage } = response.data
        if (itemId) {
          loadCart()
        } else {
          toastError(errorMessage)
        }
      })
      .catch(error => {
        toastError(error)
      })
  }

  const submitCart = () => {
    // submit items
    const { itemsInCart } = cart

    if (itemsInCart && itemsInCart.length > 0) {
      const postData = {
        items: itemsInCart.filter(a => a.customerId == customerId),
        customerId: customerId,
        cartId: currentCartId,
      }
      cartApi
        .SubmitItemsInCart(postData)
        .then(response => {
          loadCart()
        })
        .catch(error => {
          toastError(error)
        })
    }
  }

  const unSubmitCart = () => {
    // unsubmit items
    const { itemsInCart } = cart

    if (itemsInCart && itemsInCart.length > 0) {
      const postData = {
        items: itemsInCart.filter(a => a.customerId == customerId),
        customerId: customerId,
        cartId: currentCartId,
      }
      cartApi
        .UnSubmitItemsIncart(postData)
        .then(response => {
          loadCart()
        })
        .catch(error => {
          toastError(error)
        })
    }
  }

  const placeNewOrder = () => {
    var orederRequest = {
      cartId: currentCartId,
      deliveryInformation: Constants.OrderStatus.Ordered,
    }
    // place new order
    orderApi
      .PlacedNewOrder(orederRequest)
      .then(response => {
        loadCart()
      })
      .catch(error => {
        toastError(error)
      })
  }

  const share = () => {
    const link = `${window.location.origin}/cart/${currentCartId}/${shopId}`
    navigator.clipboard.writeText(link)
    toastSuccess(`Link share was copied to clipboard: ${link}`)
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
          <Cart
            cart={cart}
            deleteItem={deleteItem}
            submitCart={submitCart}
            isHost={isHost}
            currentCustomerId={customerId}
            unSubmitCart={unSubmitCart}
            placeNewOrder={placeNewOrder}
            share={share}
          ></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Store
