import MenuDetailModal from "./ViewMenu/MenuDetailModal"
import MenuItemList from "../components/MenuItemList"
import SectionHeader from "../components/SectionHeader"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import shopApi from "../api/shopApi"
import itemApi from "../api/itemApi"
import useToast from "../hooks/useToast"

const ViewMenu = () => {
  const [rowData, setRowData] = useState([])
  const modalRef = useRef(null)

  const signInformation = useSelector(state => state.SignIn)
  const { toastError, toastSuccess } = useToast()
  const editItem = id => {
    modalRef.current.open(id)
  }

  const addItem = () => {
    modalRef.current.open()
  }
const data = { ShopId: signInformation.signInInfor.shopId }
  const deleteItem = id => {
    data.ItemId = id
    itemApi
      .Delete(data)
      .then(response => {
        toastSuccess("Delete success")
        fetchData()
      })
      .catch(error => {
        toastError(error)
      })
  }

  const fetchData = async () => {
    try {
      const response = await shopApi.getShopInforById(
        signInformation.signInInfor.shopId
      )
      setRowData(response.data.items.filter(a=>a.isActive))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <SectionHeader
        title="View Menu"
        addItem={() => addItem()}
      ></SectionHeader>
      {rowData && (
        <MenuItemList
          items={rowData}
          editItem={editItem}
          deleteItem={deleteItem}
        ></MenuItemList>
      )}

      <MenuDetailModal ref={modalRef} refreshData={fetchData}></MenuDetailModal>
    </>
  )
}

export default ViewMenu
