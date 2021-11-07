import { Button, Divider, Header, Icon, Label, List,Checkbox } from "semantic-ui-react"
import CartItemGroup from "./CartItemGroup"
import { formatCurrency, formatPercentage } from "./../helpers/number-helper"
import { groupBy } from "../helpers/common-helper"

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
    isCurrentCustomerSubmited = !currentCustomerCartGroup.some(
      a => !a.readyToOrder
    )
  }

  return (
    <>
      <Header>Cart {cartId}</Header>
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
          style={{ marginTop: 15, left: 0, width: "49%", marginRight: "1%" }}
          onClick={() => {
            submitCart()
          }}
        />
        <Button
          disabled={!isCurrentCustomerSubmited}
          basic
          content="Un Submit"
          labelPosition="left"
          icon="thumbs up outline"
          color="red"
          style={{ marginTop: 15, width: "49%" }}
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
