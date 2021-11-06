import { useSelector } from "react-redux"
import { Grid, Header, Icon } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"

const CartItem = ({ item, deleteItem }) => {
  const userInfor = useSelector(state => state.SignIn)
  const currentCustomerId = userInfor.signInInfor.customerId

  const { itemName, price, amount, itemId, customerId } = item
  return (
    <Grid.Row columns={4}>
      <Grid.Column width={8}>
        <Header size="tiny" className="cart-item-name">
          {itemName}
        </Header>
      </Grid.Column>
      <Grid.Column width={2}>
        <span className="cart-quantity">x{amount}</span>
      </Grid.Column>
      <Grid.Column width={4}>
        <Header size="tiny" className="cart-subtotal">
          {formatCurrency(price * amount)}
        </Header>
      </Grid.Column>
      {currentCustomerId === customerId && (
        <Grid.Column width={1}>
          {/* <span className="cart-remove" onClick={() => deleteItem(itemId)}> */}
            <Icon
              name="delete"
              color="red"
              onClick={() => deleteItem(itemId)}
            />
          {/* </span> */}
        </Grid.Column>
      )}
    </Grid.Row>
  )
}

export default CartItem
