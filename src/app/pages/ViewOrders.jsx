import { AgGridReact } from "ag-grid-react"
import { useMemo, useRef, useState } from "react"
import { generateOrders } from "../helpers/fake-data-helper"
import ActionCellRenderer from "./ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "./ViewOrders/StatusCellRenderer"
import OrderDetailModal from "./ViewOrders/OrderDetailModal"
import SectionHeader from "../components/SectionHeader"
import { useSelector } from "react-redux"

const ViewOrders = () => {


  const signInformation = useSelector(state => state.SignIn)

  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { field: "orderNumber", pinned: "left" },
      { field: "customerName" },
      { field: "customerPhone" },
      { field: "total" },
      { field: "status", cellRenderer: "statusCellRenderer" },
      { field: "orderTime", sort: "desc" },
      {
        field: "action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams: {
          onViewOrder: id => viewOrder(id),
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
  const [rowData] = useState(generateOrders())
  const gridHeight = window.innerHeight

  const modalRef = useRef(null)

  const viewOrder = id => {
    modalRef.current.open(id)
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
