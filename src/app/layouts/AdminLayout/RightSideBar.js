import { useEffect, useRef, useState } from "react"
import { Button, Divider, Image } from "semantic-ui-react"
import StoreInforField from "../../components/StoreInforField"
import { useSelector } from "react-redux"
import shopApi from "../../api/shopApi"
import { useHistory } from "react-router"
import useToast from "../../hooks/useToast"
import SectionHeader from "../../components/SectionHeader"

const RightSideBar = () => {
  const [shop, setShop] = useState({})
  const { toastSuccess, toastError } = useToast()

  const shopId = useSelector(state => state.SignIn).signInInfor.shopId

  useEffect(() => {
    const shopInfor = shopApi
      .getShopInforById(shopId)
      .then(response => {
        setShop(response.data)
      })
      .catch(console.error())
  }, [])

  const { image, name, phoneNumber } = shop

  const link = `http://localhost:3000/store/${shopId}`

  const imgSrc = `data:image/jpeg;base64,${image}`

  const history = useHistory()

  const viewShopProfile = id => {
    history.push("profile")
  }

  const share = () => {
    navigator.clipboard.writeText(link)
    toastSuccess(`Link share was copied to clipboard: ${link}`)
  }

  return (
    <div className="admin-layout_side-bar">
      <SectionHeader title="Shop Information"></SectionHeader>
      <Divider />
      <Image
        src={
          image
            ? imgSrc
            : "https://dummyimage.com/900x900/aaaaaa/eeeeee.png&text=Logo+Image"
        }
        fluid
        rounded
        onClick={viewShopProfile}
        target="_blank"
      />

      <StoreInforField
        icon="linkify"
        title="Link"
        label={link}
      ></StoreInforField>

      <Button
        basic
        content="Share"
        labelPosition="left"
        icon="share alternate"
        onClick={share}
        color="green"
        style={{ marginTop: 15, width: "100%" }}
      />
      <Divider />

      <StoreInforField
        icon="hashtag"
        title="ID"
        label={shopId}
      ></StoreInforField>
      <Divider />
      <StoreInforField
        icon="home"
        title="Shop Name: "
        label={name}
      ></StoreInforField>
      <Divider />
      <StoreInforField
        icon="phone"
        title="Phone Number"
        label={phoneNumber}
      ></StoreInforField>
    </div>
  )
}

export default RightSideBar
