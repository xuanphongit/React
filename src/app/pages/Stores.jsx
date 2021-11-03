import { useState, useEffect } from "react"
import StoreList from "../components/StoreList"
import shopApi from "../api/shopApi"
import useToast from "../hooks/useToast"

const DashboardGuest = () => {
  const { toastError } = useToast()
  const [stores, setStores] = useState([])

  useEffect(() => {
    shopApi
      .GetAll()
      .then(response => {
        stores = setStores(response.data)
      })
      .catch(error => {
        if (error.response) {
          toastError(error.response.data)
        }
      })
  }, [])

  return (
    <>
      <div className="store-search"></div>
      <div className="store-list">
        {stores && <StoreList stores={stores}></StoreList>}
      </div>
    </>
  )
}

export default DashboardGuest
