import { useState } from "react"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"

const HeaderGuest = () => {
  const history = useHistory()
  const [activeItem] = useState(null)

  return (
    <Menu className="header" pointing secondary widths={5}>
      <Menu.Item></Menu.Item>
      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/profile")}
      >
        <Icon size={"small"} name="user" /> Profile
      </Menu.Item>
      <Menu.Item onClick={() => history.push("/store")}>
        <Image src="/logo/logo32.png" />
      </Menu.Item>
      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => history.push("/sign-in")}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  )
}

export default HeaderGuest
