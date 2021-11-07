import { Button, Divider, Grid, Icon, Image, List } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"

const MenuItem = ({ item, editItem, addToCart, deleteItem }) => {
  const { image, name, price, itemId } = item
  return (
    <List.Item className="menu-item">
      <List.Content>
        <Grid>
          <Grid.Column width={4}>
            <Image
              rounded
              src={
                image
                  ? `data:image/jpeg;base64,${image}`
                  : "https://dummyimage.com/900x900/ecf0f1/aaa"
              }
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <List.Header as="a">Item Name: {name}</List.Header>
            <Divider></Divider>
            <List.Header>Cost: {formatCurrency(price)}</List.Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <div className="menu-item_actions">
              {editItem && (
                <>
                  <button
                    class="ui yellow button"
                    onClick={() => editItem(itemId)}
                  >
                    Edit Item
                  </button>

                  <button
                    class="ui red button"
                    onClick={() => deleteItem(itemId)}
                  >
                    Delete Item
                  </button>
                </>
              )}

              {addToCart && (
                <Button
                  icon
                  style={{
                    marginTop: 15,
                    left: 0,
                    width: "100%",
                  }}
                  color="green"
                  onClick={() => addToCart(itemId)}
                  title="Add to Cart"
                >
                  <Icon name="cart plus" />
                  &nbsp; Add to cart
                </Button>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </List.Content>
    </List.Item>
  )
}

export default MenuItem
