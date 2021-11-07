import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"
import { clearStore } from "../pages/SignIn/signInSlice"

const HeaderGuest = () => {
  const history = useHistory()
  const [activeItem] = useState(null)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(clearStore())
    history.push("/sign-in")
  }

  return (
    <Menu className="header" pointing secondary widths={5}>
      <Menu.Item></Menu.Item>
      <Menu.Item onClick={() => history.push("/store")}>
        Store List
        <i className=" large coffee icon"></i>
      </Menu.Item>
      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/profile")}
      >
        <Icon size={"small"} name="user" /> Profile
      </Menu.Item>

      <Menu.Item onClick={() => history.push("/store")}>
        History
        <i className=" small history icon"></i>
      </Menu.Item>

      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => signOut()}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  )
}

export default HeaderGuest
