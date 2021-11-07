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
import HistoryOrder from "../pages/HistoryOrder"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/view-orders" />
        </Route>
        <Route path="/Home" exact component={Home} />
        <AdminLayoutRoute exact path="/admin/profile" component={Profile} />
        <AdminLayoutRoute
          exact
          path="/admin/view-orders"
          component={ViewOrders}
        />
        <AdminLayoutRoute exact path="/admin/view-menu" component={ViewMenu} />
        <CustomerLayoutRoute exact path="/store" component={Stores} />
        <CustomerLayoutRoute exact path="/store/:shopId" component={Store} />
        <CustomerLayoutRoute
          path="/Cart/:cartId/:shopId"
          exact
          component={Store}
        />
        <CustomerLayoutRoute exact path="/history" component={HistoryOrder} />
        <DefaultLayoutRoute exact path="/sign-in" component={SignIn} />
        <DefaultLayoutRoute exact path="/sign-up" component={SignUp} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
