import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Redirect } from "react-router"
import AdminLayoutRoute from "./../layouts/AdminLayout"
import CustomerLayoutRoute from "./../layouts/CustomerLayout"
import NotFound from "./../pages/404"
import ViewOrders from "../pages/ViewOrders"
import ViewMenu from "./../pages/ViewMenu"
import Stores from "../pages/Stores"
import Store from "../pages/Store"
import DefaultLayoutRoute from "./../layouts/DefaultLayout"
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"
import Home from "../pages/Home/Home"
import Profile from "../pages/Profile/Profile"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/store" />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/view-orders" />
        </Route>
        <AdminLayoutRoute
          exact
          path="/admin/view-orders"
          component={ViewOrders}
        />
        <Route path="/Home" exact component={Home} />
        <Route path="/Cart/:cartId/:shopId" exact component={Store} />
        <AdminLayoutRoute exact path="/admin/view-menu" component={ViewMenu} />
        <CustomerLayoutRoute exact path="/store" component={Stores} />
        <CustomerLayoutRoute exact path="/store/:shopId" component={Store} />
        <DefaultLayoutRoute exact path="/sign-in" component={SignIn} />
        <DefaultLayoutRoute exact path="/sign-up" component={SignUp} />
        <DefaultLayoutRoute exact path="/admin/profile" component={Profile} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
