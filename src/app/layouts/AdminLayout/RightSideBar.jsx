import { useRef } from "react"
import { Button, Image } from "semantic-ui-react"
import StoreInforField from "../../components/StoreInforField"
import ModifyStoreModal from "./RightSideBar/ModifyStoreModal"
import { generateStore } from "../../helpers/fake-data-helper"

const RightSideBar = () => {
  const store = generateStore()

  const { id, image, link, name, address, phone } = store
  const modalRef = useRef(null)

  const viewShopProfile = id => {
    modalRef.current.open(id)
  }

  const share = () => {}

  const copy = () => {}

  return (
    <div className="admin-layout_side-bar">
      <Image
        src={image}
        fluid
        rounded
        onClick={viewShopProfile}
        target="_blank"
      />

      <StoreInforField
        icon="linkify"
        title="Link"
        label={link}
        link={link}
      ></StoreInforField>
      <StoreInforField icon="hashtag" title="ID" label={id}></StoreInforField>
      <StoreInforField icon="home" title="Name" label={name}></StoreInforField>
      <StoreInforField
        icon="phone"
        title="Phone Number"
        label={phone}
      ></StoreInforField>
      <StoreInforField
        icon="map pin"
        title="Address"
        label={address}
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

      <Button
        basic
        content="Copy Link"
        labelPosition="left"
        icon="linkify"
        onClick={copy}
        color="brown"
        style={{ marginTop: 15, width: "100%" }}
      />

      <Button
        basic
        content="Edit Profile"
        labelPosition="left"
        icon="briefcase"
        onClick={viewShopProfile}
        color="blue"
        style={{ marginTop: 15, width: "100%" }}
      />

      <ModifyStoreModal ref={modalRef}></ModifyStoreModal>
    </div>
  )
}

export default RightSideBar
