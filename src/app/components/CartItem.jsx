import { Grid, Header, Icon } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"

const CartItem = ({ item }) => {
  const { name, price, quantity, note } = item
  return (
    <Grid.Row columns={4}>
      <Grid.Column width={1}>
        <span className="cart-remove">
          <Icon name="delete" color="red" />
        </span>
      </Grid.Column>
      <Grid.Column width={8}>
        <Header size="tiny" className="cart-item-name">
          {name}
        </Header>
        <span className="cart-item-note">{note}</span>
      </Grid.Column>
      <Grid.Column width={2}>
        <span className="cart-quantity">x{quantity}</span>
      </Grid.Column>
      <Grid.Column width={4}>
        <Header size="tiny" className="cart-subtotal">
          {formatCurrency(price * quantity)}
        </Header>
      </Grid.Column>
    </Grid.Row>
  )
}

export default CartItem
