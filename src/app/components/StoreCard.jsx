import { Card, Icon, Image } from "semantic-ui-react"

const StoreCard = ({ store }) => {
  const { image, name, id, brief, phoneNumber, location } = store
  const link = `/store/${id}`

  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <a href={link}>{name}</a>
        </Card.Header>
        <Card.Meta>
          <Icon name="map" /> {location}
        </Card.Meta>
        <Card.Description>{brief}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="phone"></Icon> {phoneNumber}
      </Card.Content>
    </Card>
  )
}

export default StoreCard
