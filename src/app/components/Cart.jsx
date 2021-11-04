import { Button, Divider, Header, Label, List } from "semantic-ui-react"
import CartItemGroup from "./CartItemGroup"
import { formatCurrency, formatPercentage } from "./../helpers/number-helper"
import { groupBy } from "../helpers/common-helper"

const Cart = ({ cart, deleteItem }) => {
  const { cartId, shopId, customerId, itemsInCart, totalPrice } = cart

  let customerIds = []
  let group = {}
  if (itemsInCart && itemsInCart.length) {
    // get distinct customer id from list item
    customerIds = [...new Set(itemsInCart.map(item => item.customerId))]

    // group items by customer id
    group = groupBy(itemsInCart, "customerId")
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
      <Button
        basic
        content="Submit"
        labelPosition="left"
        icon="thumbs up outline"
        color="green"
        style={{ marginTop: 15, width: "100%" }}
      />
      <Divider></Divider>
      {customerIds &&
        customerIds.map(customerId => (
          <CartItemGroup
            key={customerId}
            group={group[customerId]}
            deleteItem={deleteItem}
          ></CartItemGroup>
        ))}
    </>
  )
}

export default Cart
