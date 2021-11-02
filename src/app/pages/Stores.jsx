import { useState } from "react"
import StoreList from "../components/StoreList"
import { generateStores } from "../helpers/fake-data-helper"

const DashboardGuest = () => {
  const [stores] = useState(generateStores())

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
