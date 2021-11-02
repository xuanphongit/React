import { useParams } from "react-router"
import { useState } from "react"
import MenuItemList from "./../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { generateCart, generateMenu } from "../helpers/fake-data-helper"
import { useSelector } from "react-redux"

const Store = () => {
  const menuFake = generateMenu()
  const cartFake = generateCart(menuFake)

  const { id } = useParams()
  const [items] = useState(menuFake)
  const [cart] = useState(cartFake)

  const addToCart = id => {}

  const userInfor = useSelector(state=> state.SignIn)

  return (
    <>
      <Header size="medium">Shop {id}</Header>
      <Grid>
        <Grid.Column width={12}>
          {items && (
            <MenuItemList items={items} addToCart={addToCart}></MenuItemList>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Cart cart={cart}></Cart>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Store
