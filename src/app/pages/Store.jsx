import { useParams } from "react-router"
import { useEffect, useState } from "react"
import MenuItemList from "./../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useSelector } from "react-redux"
import shopApi from "../api/shopApi"
import cartApi from "../api/cartApi"
import orderApi from "../api/orderApi"
import useToast from "../hooks/useToast"
import { getHubConnection } from "../signalr/signalr"
import { HubConnectionUrl, HubMethod } from "../signalr/hubConstants"
import { Constants } from "../helpers/constants"

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
      const hubConnection = getHubConnection(cartHub, cartNotifyHandle)
      setCartHubConnection(hubConnection)
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

    cartHubConnection.on(HubMethod.NewOrder, response => {
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
  }

  const connectShopHub = shopId => {
    if (!shopHubConnection) {
      const shopHub = `${HubConnectionUrl.ShopHub}${shopId}`
      const hubConnection = getHubConnection(shopHub)
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
        // refresh cart
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
          <Cart
            cart={cart}
            deleteItem={deleteItem}
            submitCart={submitCart}
            isHost={isHost}
            currentCustomerId={customerId}
            unSubmitCart={unSubmitCart}
            placeNewOrder={placeNewOrder}
          ></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Store
