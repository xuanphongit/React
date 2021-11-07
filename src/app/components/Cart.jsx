import {
  Button,
  Divider,
  Header,
  Icon,
  Label,
  List,
  Checkbox,
  Grid,
} from "semantic-ui-react"
import CartItemGroup from "./CartItemGroup"
import { formatCurrency, formatPercentage } from "./../helpers/number-helper"
import { groupBy } from "../helpers/common-helper"
import useToast from "../hooks/useToast"

const Cart = ({
  cart,
  deleteItem,
  submitCart,
  isHost,
  currentCustomerId,
  unSubmitCart,
  placeNewOrder,
}) => {
  const { cartId, shopId, customerId, itemsInCart, totalPrice } = cart
  const { toastSuccess, toastError } = useToast()
  let customerIds = []
  let group = {}
  let isCurrentCustomerSubmited = false
  let currentCustomerCartGroup = []
  let isAllMemberSubmit = false

  if (itemsInCart && itemsInCart.length) {
    isAllMemberSubmit = !itemsInCart.some(a => !a.readyToOrder)

    // get distinct customer id from list item
    customerIds = [...new Set(itemsInCart.map(item => item.customerId))]

    // group items by customer id
    group = groupBy(itemsInCart, "customerId")
    currentCustomerCartGroup = group[currentCustomerId]
    isCurrentCustomerSubmited =
      currentCustomerCartGroup &&
      currentCustomerCartGroup.length > 0 &&
      !currentCustomerCartGroup.some(a => !a.readyToOrder)
  }

  const share = () => {
    const link = `http://localhost:3000/cart/${cartId}/${shopId}`
    navigator.clipboard.writeText(link)
    toastSuccess(`Link share was copied to clipboard: ${link}`)
  }

  return (
    <>
      <Header>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>Cart {cartId}</Grid.Column>
            <Grid.Column>
              {isHost && (
                <Button
                  basic
                  content="Share"
                  labelPosition="left"
                  icon="share alternate"
                  onClick={share}
                  color="green"
                  style={{ width: "100%", height: "100%", padding: "10px" }}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Header>
      <Divider></Divider>
      <List divided selection>
        <List.Item className="total">
          Total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(totalPrice || 0)}
          </Label>
        </List.Item>
      </List>
      <div>
        <Button
          disabled={isCurrentCustomerSubmited}
          basic
          content="Submit"
          labelPosition="left"
          icon="thumbs up outline"
          color="green"
          style={{ marginTop: 15, left: 0, width: "48%", marginRight: "1%" }}
          onClick={() => {
            submitCart()
          }}
        />
        <Button
          disabled={!isCurrentCustomerSubmited}
          basic
          content="Un Submit"
          labelPosition="left"
          icon="thumbs down outline"
          color="red"
          style={{ marginTop: 15, width: "48%" }}
          onClick={() => {
            unSubmitCart()
          }}
        />
      </div>
      <Divider></Divider>
      {customerIds &&
        customerIds.map(customerId => (
          <CartItemGroup
            key={customerId}
            group={group[customerId]}
            deleteItem={deleteItem}
          ></CartItemGroup>
        ))}

      {isHost && (
        <Button
          disabled={!isAllMemberSubmit}
          primary
          style={{ marginTop: 15, width: "100%" }}
          onClick={() => {
            placeNewOrder()
          }}
        >
          Delivery Now
        </Button>
      )}
    </>
  )
}

export default Cart
