import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"
import { clearStore } from "../pages/SignIn/signInSlice"

const HeaderAdmin = () => {
  const history = useHistory()
  const [activeItem] = useState(null)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(clearStore())
    history.push("/sign-in")
  }

  return (
    <Menu className="header" stackable pointing secondary widths={5}>
      <Menu.Item name="orders" onClick={() => history.push("/admin")}>
        <Icon name="list" /> Orders
      </Menu.Item>

      <Menu.Item name="menu" onClick={() => history.push("/admin/view-menu")}>
        <Icon name="list alternate outline" /> Menu
      </Menu.Item>

      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/admin/profile")}
      >
        <i className="settings icon"></i>
        Profile
      </Menu.Item>

      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => signOut()}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default HeaderAdmin
