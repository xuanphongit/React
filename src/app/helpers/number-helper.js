import numeral from "numeral"

export const formatCurrency = (value, currency = "đ") => {
  return `${numeral(value).format("0,0")}${currency}`
}

export const formatPercentage = value => {
  return `${numeral(value).format("0,0")}%`
}
