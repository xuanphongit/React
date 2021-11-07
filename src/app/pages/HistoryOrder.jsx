import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import orderApi from "../api/orderApi"
import { formatDate, formatMoney } from "../helpers/common-helper"
import useToast from "../hooks/useToast"
import HistoryOrderDetailModal from "./HistoryOrder/OrderDetailModal"
import ActionCellRenderer from "./ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "./ViewOrders/StatusCellRenderer"


const HistoryOrder = () => {
  const { toastSuccess, toastError } = useToast()

  const userInfor = useSelector(state => state.SignIn)
  const customerId = userInfor.signInInfor.customerId

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    orderApi
      .GetAllOrdersOfCustomer(customerId)
      .then(response => {
        setRowData(response.data.orders)
      })
      .catch(error => {
        toastError(error)
      })
  }

  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { headerName: "Order Id", field: "orderId", pinned: "left" },
      { headerName: "Shop Id", field: "shopId" },
      { headerName: "Shop Name", field: "shopName" },
      { headerName: "Shop Phone", field: "phoneNumberOfShop" },
      {
        headerName: "Total Price",
        field: "totalPrice",
        cellRenderer: data => {
          return data.value ? formatMoney(data.value) : "0"
        },
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: "statusCellRenderer",
      },

      {
        headerName: "Delivery Information",
        field: "deliveryInformation",
        cellRenderer: "statusCellRenderer",
      },

      {
        headerName: "Order Time",
        field: "orderTime",
        sort: "desc",
        width: 250,
        cellRenderer: data => {
          return data.value ? formatDate(new Date(data.value)) : ""
        },
      },
      {
        field: "Action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams(params) {
          return {
            onViewOrder: viewOrder,
            data: {
              id: params.data.orderId,
            },
          }
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
    modalRef.current.open(orderId)
  }

  return (
    <>
      History Orders
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
      <HistoryOrderDetailModal
        ref={modalRef}
      ></HistoryOrderDetailModal>
    </>
  )
}

export default HistoryOrder
