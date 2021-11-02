import { Button, Divider, Header, Label, List } from "semantic-ui-react"
import { generateKey } from "../helpers/crypto-helper"
import CartItemGroup from "./CartItemGroup"
import { formatCurrency, formatPercentage } from "./../helpers/number-helper"

const Cart = ({ cart }) => {
  const { id, groups, subtotal, discount, total } = cart

  return (
    <>
      <Header>Cart {id}</Header>

      <List divided selection>
        <List.Item>
          Sub-total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(subtotal || 0)}
          </Label>
        </List.Item>
        <List.Item>
          Discount
          <Label horizontal style={{ float: "right" }}>
            {formatPercentage(discount * 100 || 0)}
          </Label>
        </List.Item>
        <List.Item className="total">
          Total
          <Label horizontal style={{ float: "right" }}>
            {formatCurrency(total || 0)}
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
      {groups &&
        groups.map(group => (
          <CartItemGroup key={generateKey()} group={group}></CartItemGroup>
        ))}
    </>
  )
}

export default Cart
