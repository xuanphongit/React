import { useState } from "react"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"

const HeaderAdmin = () => {
  const history = useHistory()
  const [activeItem] = useState(null)

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
        onClick={() => history.push("/sign-in")}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default HeaderAdmin
