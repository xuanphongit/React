import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { generateKey } from "../helpers/crypto-helper"
import CartItem from "./CartItem"

const CartItemGroup = ({ group }) => {
  
  return (
    <Segment raised>
      <Header size={"small"}>{group[0].customerName}</Header>
      <Container>
        <Grid>
          {group &&
            group.map(group => (
              <CartItem key={generateKey()} item={group}></CartItem>
            ))}
        </Grid>
      </Container>
    </Segment>
  )
}

export default CartItemGroup
