import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { generateKey } from "../helpers/crypto-helper"
import CartItem from "./CartItem"

const CartItemGroup = ({ group }) => {
  const { userName, items } = group
  return (
    <Segment raised>
      <Header size={"small"}>{userName}</Header>
      <Container>
        <Grid>
          {items &&
            items.map(item => (
              <CartItem key={generateKey()} item={item}></CartItem>
            ))}
        </Grid>
      </Container>
    </Segment>
  )
}

export default CartItemGroup
