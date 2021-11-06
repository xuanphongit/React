import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { generateOrders } from "../helpers/fake-data-helper"
import ActionCellRenderer from "./ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "./ViewOrders/StatusCellRenderer"
import OrderDetailModal from "./ViewOrders/OrderDetailModal"
import SectionHeader from "../components/SectionHeader"
import { useSelector } from "react-redux"
import orderApi from "../api/orderApi"
import useToast from "../hooks/useToast"

const ViewOrders = () => {
  const { toastSuccess, toastError } = useToast()

  const shopId = useSelector(state => state.SignIn).signInInfor.shopId
  const [rowData, setRowData] = useState(generateOrders())

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    orderApi
      .GetAllOrdersOfShop(shopId)
      .then(response => {
        setRowData(response.data.orders)
        console.log(response.data)
      })
      .catch(error => {
        toastError(error)
      })
  }

  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { headerName: "Id", field: "orderId", pinned: "left" },
      { headerName: "Customer Name", field: "customerName" },
      { headerName: "Customer Phone", field: "customerPhoneNumber" },
      { headerName: "Total Price", field: "totalPrice" },
      {
        headerName: "Status",
        field: "deliveryInformation",
        cellRenderer: "statusCellRenderer",
      },
      {
        headerName: "Order Time",
        field: "orderTime",
        sort: "desc",
        width: 250,
        cellRenderer: data => {
          return data.value ? new Date(data.value).toLocaleTimeString() : ""
        },
      },
      {
        field: "action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams: {
          onViewOrder: Id => viewOrder(Id),
        },
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  // changes, needs to be state
  const gridHeight = window.innerHeight

  const modalRef = useRef(null)

  const viewOrder = orderId => {
    console.log(orderId)
    modalRef.current.open(orderId)
  }

  return (
    <>
      <SectionHeader title="View Orders"></SectionHeader>
      <div
        className="ag-theme-material grid-order"
        style={{ height: gridHeight - 150 }}
      >
        <AgGridReact
          reactUi="true"
          className="ag-theme-material"
          animateRows="true"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          frameworkComponents={{
            actionCellRenderer: ActionCellRenderer,
            statusCellRenderer: StatusCellRenderer,
          }}
        />
      </div>
      <OrderDetailModal ref={modalRef}></OrderDetailModal>
    </>
  )
}

export default ViewOrders
