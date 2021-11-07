import { Route } from "react-router"
import { Container, Grid } from "semantic-ui-react"

const DefaultLayout = ({ children }) => {
  return (
    <div className="layout__default">
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}>
          <Container className="app__content" fluid>
            <Container fluid className="app__content-wrapper">
              {children}
            </Container>
          </Container>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid>
    </div>
  )
}

const DefaultLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  )
}

export default DefaultLayoutRoute
