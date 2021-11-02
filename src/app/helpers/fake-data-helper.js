import faker from "faker"
import dayjs from "dayjs"
import { generateId } from "./crypto-helper"

export const generateItems = () => {
  const order = []
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 10 }); i++) {
    const item = {
      name: faker.commerce.productName(),
      id: `ITM${faker.datatype.number({
        min: 100000,
        max: 999999,
      })}`,
      price: faker.commerce.price(),
      quantity: faker.datatype.number({ min: 1, max: 10 }),
      note: `N/A`,
    }

    item.total = item.quantity * item.price

    order.push(item)
  }
  return order
}

export const generateOrders = () => {
  const orders = []
  const status = [
    "Confirmed",
    "Cancelled",
    "Sent To Kitchen",
    "Ready for Pickup",
    "Ready for Delivery",
    "Delivered",
  ]
  for (let i = 0; i < faker.datatype.number({ min: 10, max: 100 }); i++) {
    const id = `ORD${faker.datatype.number({
      min: 100000,
      max: 999999,
    })}`
    const order = {
      id,
      orderNumber: id,
      orderTime: dayjs(faker.date.past()).format("MM/DD/YYYY HH:mm"),
      customerName: faker.name.findName(),
      customerPhone: faker.phone.phoneNumber(),
      total: faker.datatype.number({ min: 300, max: 2000 }),
      status: status[faker.datatype.number({ min: 0, max: status.length - 1 })],
    }

    orders.push(order)
  }
  return orders
}

export const generateStores = () => {
  const stores = []
  for (let i = 0; i < faker.datatype.number({ min: 10, max: 100 }); i++) {
    const store = {
      id: `STR${faker.datatype.number({
        min: 100000,
        max: 999999,
      })}`,
      name: faker.company.companyName(),
      brief: faker.lorem.sentences(),
      image: `https://source.unsplash.com/random/900x900?food,${faker.datatype.number()}`,
      location: faker.address.city(),
      phoneNumber: faker.phone.phoneNumber(),
    }
    stores.push(store)
  }
  return stores
}

export const generateMenu = () => {
  const menu = []
  for (let i = 0; i < 15; i++) {
    const item = {
      image: `https://source.unsplash.com/random/?food,${i}`,
      name: faker.commerce.productName(),
      id: `ITM${faker.datatype.number({
        min: 100000,
        max: 999999,
      })}`,
      price: faker.commerce.price() * 1000,
      description: faker.commerce.productDescription(),
    }
    menu.push(item)
  }
  return menu
}

export const generateCart = menuItems => {
  const cartGroups = []
  let total = 0
  const discount = (faker.datatype.number({ min: 1, max: 5 }) * 10) / 100

  // groups
  for (let i = 0; i < faker.datatype.number({ min: 1, max: 5 }); i++) {
    // items
    const items = []
    for (let j = 0; j < menuItems.length; j++) {
      if (faker.datatype.number({ min: 1, max: 5 }) % 3 === 0) {
        const item = {
          ...menuItems[j],
          quantity: faker.datatype.number({ min: 1, max: 5 }),
        }
        total += item.price * item.quantity
        items.push(item)
      }
    }

    const group = {
      userId: `USR${faker.datatype.number({
        min: 100000,
        max: 999999,
      })}`,
      userName: faker.name.findName(),
      items,
    }

    cartGroups.push(group)
  }

  return {
    id: `CRT${faker.datatype.number({
      min: 100000,
      max: 999999,
    })}`,
    subtotal: total,
    discount,
    total: total - total * discount,
    groups: cartGroups,
  }
}

export const generateStore = () => {
  return {
    id: `STR${faker.datatype.number({
      min: 100000,
      max: 999999,
    })}`,
    link: `link.com/${generateId()}`,
    image: `https://source.unsplash.com/random/?food,${faker.datatype.number()}`,
    name: `${faker.company.companyName()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.county()}, ${faker.address.city()}, ${faker.address.state()}`,
    phone: faker.phone.phoneNumber(),
  }
}

export const generateMenuItem = () => {
  return {
    image: `https://source.unsplash.com/random/?food`,
    name: faker.commerce.productName(),
    id: `ITM${faker.datatype.number({
      min: 100000,
      max: 999999,
    })}`,
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  }
}

export const generateOrder = () => {
  const id = `ORD${faker.datatype.number({
    min: 100000,
    max: 999999,
  })}`
  return {
    id,
    orderNumber: id,
    orderTime: faker.date.past(),
    customerName: faker.name.findName(),
    customerPhone: faker.phone.phoneNumber(),
  }
}
