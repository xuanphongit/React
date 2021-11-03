import { Button, Grid, Icon, Image, List } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"

const MenuItem = ({ item, editItem, addToCart }) => {
  const { image, name, price, itemId } = item
  return (
    <List.Item className="menu-item">
      <List.Content>
        <Grid>
          <Grid.Column width={4}>
            <Image rounded src={`data:image/jpeg;base64,${image}`} />
          </Grid.Column>
          <Grid.Column width={10}>
            <List.Header as="a">{name}</List.Header>
            <List.Header>{formatCurrency(price)}</List.Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <div className="menu-item_actions">
              {editItem && (
                <>
                  <Button
                    icon
                    color="blue"
                    onClick={() => editItem(itemId)}
                    title="Modify Item"
                  >
                    <Icon name="pencil" />
                  </Button>
                  <Button icon color="red" title="Delete Item">
                    <Icon name="delete" />
                  </Button>
                </>
              )}

              {addToCart && (
                <Button
                  icon
                  color="green"
                  onClick={() => addToCart(itemId)}
                  title="Add to Cart"
                >
                  <Icon name="cart plus" />
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
