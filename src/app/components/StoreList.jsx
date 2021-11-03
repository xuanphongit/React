import { Card } from "semantic-ui-react"
import StoreCard from "./StoreCard"

const StoreList = ({ stores }) => {
  return (
    <Card.Group itemsPerRow={4}>
      {stores.map(s => (
        <StoreCard store={s} key={s.shopId} />
      ))}
    </Card.Group>
  )
}

export default StoreList
