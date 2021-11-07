import { AgGridReact } from "ag-grid-react/lib/agGridReact"
import dayjs from "dayjs"
import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { Button, Dropdown, Modal } from "semantic-ui-react"
import orderApi from "../../api/orderApi"
import { Constants } from "../../helpers/constants"

const HistoryOrderDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderInfor, setOrderInfor] = useState({})
  const [rowData, setRowData] = useState([])
  const [statusOrder, setstatusOrder] = useState("")
  const [orderId, setOrderId] = useState("")

  useImperativeHandle(ref, () => ({
    open(orderId) {
      setIsOpen(true)
      setOrderId(orderId)
      orderApi.GetOrder(orderId).then(response => {
        setOrderInfor(response.data)
        setstatusOrder(response.data.status)
        setRowData(response.data.itemsInCart)
      })
    },
  }))

  const columnDefs = useMemo(() => [
    {
      field: "image",
      minWidth: 100,
      width: 100,
      maxWidth: 100,
      fitCell: true,
      cellRenderer: data => {
        return `<img src="data:image/png;base64,${data.value}" width="90px" height="90px">`
      },
    },
    { field: "customerName", minWidth: 100 },
    { field: "itemName" },
    { field: "price" },
    { field: "amount" },
  ])

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  )

  const { orderTime, totalPrice, customerId } = orderInfor

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>{`Order #${orderId}`}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div
            className="order-items ag-theme-material"
            style={{ height: 240 }}
          >
            <AgGridReact
              reactUi="true"
              className="ag-theme-material"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowData={rowData}
              rowSelection="multiple"
              suppressRowClickSelection="true"
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      <div className="ui horizontal divider">Sumary</div>

      <div className="ui grid">
        <div className="three column row">
          <div className="right floated column">
            <a className="item">
              <div className="ui horizontal label">Order Time :</div>
              {dayjs(orderTime).format("MM/DD/YYYY HH:mm")}
            </a>
            <div className="ui horizontal divider" />
            <a className="item">
              <div className="ui horizontal label">
                Total: &nbsp;&nbsp;&nbsp; &nbsp;
              </div>
              {totalPrice} vnđ
            </a>
          </div>
        </div>
      </div>
      <div className="ui horizontal divider"> Progress</div>
      <div className="ui ordered steps">
        <div
          className={
            [
              Constants.OrderStatus.Confirmed,
              Constants.OrderStatus.SentToKitchen,
              Constants.OrderStatus.ReadyforPickup,
              Constants.OrderStatus.Delivered,
            ].includes(statusOrder)
              ? "completed step"
              : "active step"
          }
        >
          <div className="content">
            <div className="title">Confirmed</div>
            <div className="description">Order confirmed</div>
          </div>
        </div>
        <div
          className={
            [
              Constants.OrderStatus.SentToKitchen,
              Constants.OrderStatus.ReadyforPickup,
              Constants.OrderStatus.Delivered,
            ].includes(statusOrder)
              ? "completed step"
              : "active step"
          }
        >
          <div className="content">
            <div className="title">Sent To Kitchen</div>
            <div className="description">Finished cooking</div>
          </div>
        </div>
        <div
          className={
            [
              Constants.OrderStatus.ReadyforPickup,
              Constants.OrderStatus.Delivered,
            ].includes(statusOrder)
              ? "completed step"
              : "active step"
          }
        >
          <div className="content">
            <div className="title">Ready for Pickup</div>
            <div className="description">Readly to delivered</div>
          </div>
        </div>
        <div
          className={
            [Constants.OrderStatus.Delivered].includes(statusOrder)
              ? "completed step"
              : "active step"
          }
        >
          <div className="content">
            <div className="title">Delivered</div>
            <div className="description">Delivered complete</div>
          </div>
        </div>
      </div>
      <div className="ui horizontal divider" />

      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

export default HistoryOrderDetailModal
