import { Route } from "react-router-dom"
import { Container, Grid } from "semantic-ui-react"
import LeftSideBar from "./AdminLayout/LeftSideBar"
import RightSideBar from "./AdminLayout/RightSideBar"
import HeaderAdmin from "./../components/HeaderAdmin"

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <HeaderAdmin></HeaderAdmin>
      <Grid>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={3}>
          <LeftSideBar></LeftSideBar>
        </Grid.Column>
        <Grid.Column width={8}>
          <Container className="app__content" fluid>
            <Container fluid className="app__content-wrapper">
              {children}
            </Container>
          </Container>
        </Grid.Column>
        <Grid.Column width={3}>
          <RightSideBar></RightSideBar>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid>
    </div>
  )
}

const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <AdminLayout>
          <Component {...props} />
        </AdminLayout>
      )}
    />
  )
}

export default AdminLayoutRoute
