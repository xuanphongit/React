import MenuDetailModal from "./ViewMenu/MenuDetailModal"
import MenuItemList from "../components/MenuItemList"
import { generateMenu } from "../helpers/fake-data-helper"
import SectionHeader from "../components/SectionHeader"
import { useRef, useState } from "react"

const ViewMenu = () => {
  const [rowData] = useState(generateMenu())
  const modalRef = useRef(null)

  const viewOrder = id => {
    modalRef.current.open(id)
  }

  const addItem = () => {
    modalRef.current.open()
  }

  return (
    <>
      <SectionHeader
        title="View Menu"
        addItem={() => addItem()}
      ></SectionHeader>
      {rowData && (
        <MenuItemList items={rowData} viewOrder={viewOrder}></MenuItemList>
      )}

      <MenuDetailModal ref={modalRef}></MenuDetailModal>
    </>
  )
}

export default ViewMenu
