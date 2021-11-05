
const baseURL = "https://localhost:44342/hubs"

export const HubMethod = {
    NewOrder: "NewOrder",
    CancelOrder: "CancelOrder",
    ChangeOrderStatus: "ChangeOrderStatus",
    SubmitItems: "SubmitItems",
    UnsubmitItems: "UnsubmitItems",
    AddItemToCart: "AddItemToCart",
    RemoveItemFromCart: "RemoveItemFromCart",
    RemovedCustomer: "RemovedCustomer",
    UpdateItemAmount: "UpdateItemAmount",
}

export const HubConnectionUrl = {
    CartHub: `${baseURL}/cart?cart=`,
    ShopHub: `${baseURL}/shop?shop=`,
    OrderHub: `${baseURL}/order?order=`,
}