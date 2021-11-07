import { Card, Icon, Image } from "semantic-ui-react"

const StoreCard = ({ store }) => {
  const { shopId, name, image, phoneNumber } = store
  const link = `/store/${shopId}`
  const imgSrc = `data:image/png;base64,${image}`

  return (
    <Card>
      <Image src={image ? imgSrc : "https://dummyimage.com/900x900/ecf0f1/aaa"} wrapped ui={false}/>
      <Card.Content>
        <Card.Header>
          <a href={link}>{name}</a>
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Icon name="phone"></Icon> {phoneNumber}
      </Card.Content>
    </Card>
  )
}

export default StoreCard
