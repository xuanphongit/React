import { Container, Grid, Header, Segment, Checkbox } from "semantic-ui-react"
import { generateKey } from "../helpers/crypto-helper"
import CartItem from "./CartItem"

const CartItemGroup = ({ group, deleteItem }) => {
  const isCompleted = !group.some(a => !a.readyToOrder)

  return (
    <Segment raised>
      <Header size={"small"}>
        {group[0].customerName} <Checkbox label="Completed" defaultChecked={isCompleted} readOnly />
      </Header>
      <Container>
        <Grid>
          {group &&
            group.map(group => (
              <CartItem
                key={generateKey()}
                item={group}
                deleteItem={deleteItem}
              ></CartItem>
            ))}
        </Grid>
      </Container>
    </Segment>
  )
}

export default CartItemGroup
