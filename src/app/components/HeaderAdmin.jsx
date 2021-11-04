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
    <Menu className="header" stackable>
      <Menu.Item onClick={() => history.push("/admin")}>
        <Image src="/logo/logo32.png" />
      </Menu.Item>

      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/admin/profile")}
      >
        <Icon size={"small"} name="user" /> Profile
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
