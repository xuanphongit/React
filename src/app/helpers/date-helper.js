import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export const toDayjs = (date = null) => {
  let d = dayjs()
  if (date) {
    d = dayjs(date)
  }
  return d
}

export const addDay = (duration, date = null) => {
  const d = toDayjs(date)
  return d.add(duration, "day").toDate()
}

export const format = (date = null, format = "MM/DD/YYYY HH:mm") => {
  const d = toDayjs(date)
  return d.format(format)
}

export const fromNow = (dayjsObj, hasAgo = false) => {
  return dayjsObj.fromNow(hasAgo)
}

export const diff = (dateA = null, dateB = null) => {
  const dayjsA = dayjs(dateA)
  const dayjsB = dayjs(dateB)

  return dayjsA.diff(dayjsB)
}
