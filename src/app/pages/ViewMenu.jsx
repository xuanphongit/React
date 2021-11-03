import MenuDetailModal from "./ViewMenu/MenuDetailModal"
import MenuItemList from "../components/MenuItemList"
import { generateMenu } from "../helpers/fake-data-helper"
import SectionHeader from "../components/SectionHeader"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import shopApi from "../api/shopApi"

const ViewMenu = () => {
  const [rowData, setRowData] = useState([])
  const modalRef = useRef(null)

  const signInformation = useSelector(state => state.SignIn)

  const viewOrder = id => {
    modalRef.current.open(id)
  }

  const addItem = () => {
    modalRef.current.open()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await shopApi.getShopInforById(
          signInformation.signInInfor.shopId
        )
        setRowData(response.data.items)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

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
