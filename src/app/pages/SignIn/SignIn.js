import { useHistory } from "react-router"
import { useState } from "react"
import useToast from "../../hooks/useToast"
import {
  Button,
  Image,
  Form,
  Grid,
  Segment,
  Container,
  Divider,
  Label,
  Icon,
} from "semantic-ui-react"
import customerApi from "../../api/customerApi"
import shopApi from "../../api/shopApi"
import { useDispatch } from "react-redux"
import { setSignInInformation } from "./signInSlice"

const Login = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(true)
  const { toastSuccess, toastError } = useToast()

  const signUp = () => {
    history.push("/sign-up")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }
  const dispatch = useDispatch()

  const submit = () => {
    var form_data = new FormData(document.getElementById("sign-in-form"))
    const data = { phoneNumber: form_data.get("phoneNumber") }

    if (isShop) {
      shopApi
        .Login(data)
        .then(response => {
          toastSuccess("Log in successfully")

          const actionSetShopId = setSignInInformation(response.data)
          dispatch(actionSetShopId)

          history.push("/admin")
        })
        .catch(error => {
          if (error.response) {
            toastError(error.response.data)
          }
        })
    } else {
      customerApi
        .Login(data)
        .then(response => {
          const { customerId } = response.data

          if (customerId != null) {
            toastSuccess("Log in successfully")

            const actionSetShopId = setSignInInformation(response.data)

            dispatch(actionSetShopId)
            history.push("/store")
          } else {
            toastError("Customer account is not exits")
          }
        })
        .catch(error => {
          if (error.response) {
            toastError(error.response.data)
          }
        })
    }
  }

  const label = isShop ? "Sign in as customer?" : "Sign in as store owner?"

  return (
    <Container className="auth-form">
      <Image src="/logo/logo.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Label as="a" style={{ width: "100%" }} onClick={toggleView}>
            <Icon name="question circle" /> {label}
          </Label>
          <Divider />

          <Segment raised>
            <Form id="sign-in-form">
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required
                  maxLength={10}
                />
              </Form.Field>
              <Button type="submit" color="green" fluid onClick={submit}>
                Submit
              </Button>
            </Form>

            <Divider />
            <Label
              as="a"
              basic
              color="grey"
              style={{ width: "100%" }}
              onClick={signUp}
            >
              <Icon name="user plus" /> Don't have account? Register now
            </Label>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
