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
import { formatDate, formatMoney } from "../helpers/common-helper"

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
      })
      .catch(error => {
        toastError(error)
      })
  }

  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { headerName: "Order Id", field: "orderId", pinned: "left" },
      { headerName: "Customer Id", field: "customerId" },
      { headerName: "Customer Name", field: "customerName" },
      { headerName: "Customer Phone", field: "customerPhoneNumber" },
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

  const cancelOrder = (orderId, customerId) => {
    orderApi
      .CancelOrder({ orderId, customerId })
      .then(response => {
        const { errorMessage } = response.data
        if (errorMessage) {
          toastError(errorMessage)
        } else {
          getOrders()
        }
      })
      .catch(error => {
        toastError(error)
      })
  }

  const changeOrderStatus = (orderId, orderStatus, customerId) => {
    orderApi
      .ChangeOrderStatus({ orderId, orderStatus, customerId, shopId })
      .then(response => {
        const { errorMessage } = response.data
        if (errorMessage) {
          toastError(errorMessage)
        } else {
          getOrders()
        }
      })
      .catch(error => {
        toastError(error)
      })
  }

  // changes, needs to be state
  const gridHeight = window.innerHeight

  const modalRef = useRef(null)

  const viewOrder = orderId => {
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
      <OrderDetailModal
        ref={modalRef}
        cancelOrder={cancelOrder}
        changeOrderStatus={changeOrderStatus}
      ></OrderDetailModal>
    </>
  )
}

export default ViewOrders
