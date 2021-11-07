import { useHistory } from "react-router"
import { useState } from "react"
import useToast from "../../hooks/useToast"
import React from "react"
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

const Login = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(true)
  const { toastSuccess, toastError } = useToast()

  const signIn = () => {
    history.push("/sign-in")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }

  const submit = event => {
    var form_data = new FormData(document.getElementById("sign-up-form"))

    if (isShop) {
      shopApi
        .Register(form_data)
        .then(response => {
          const { errorMessage } = response.data
          if (!errorMessage||errorMessage === null) {
            toastSuccess("Create shop successfully")
            signIn()
          } else {
            toastError(errorMessage)
          }
        })
        .catch(error => {
          if (error.response) {
            toastError(error.response.data)
          }
        })
    } else {
      customerApi
        .Register(form_data)
        .then(response => {
          const { errorMessage } = response.data
          if (!errorMessage || errorMessage === null) {
            toastSuccess("Create account successfully")
            signIn()
          } else {
            toastError(errorMessage)
          }
        })
        .catch(error => {
          if (error.response) {
            toastError(error.response.data)
          }
        })
    }
  }

  const [file, setFile] = React.useState(null)

  const fileHandler = e => {
    setFile(e.target.files[0])
  }

  const label = isShop
    ? "Register as a customer?"
    : "Register as a store owner?"
  const labelName = isShop ? "Shop Number" : "Customer Name"
  const imageName = isShop ? "Logo" : "Avatar"

  return (
    <Container className="auth-form">
      <Image src="/logo/logo64.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Segment raised>
            <Label as="a" style={{ width: "100%" }} onClick={toggleView}>
              <Icon name="question circle" /> {label}
            </Label>
            <Divider />
            <Form id="sign-up-form">
              <Form.Field>
                <label>{labelName}</label>
                <input placeholder={labelName} name="name" required />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required
                  maxLength={10}
                />
              </Form.Field>

              <div>
                <Form.Field>
                  <label>{imageName}</label>
                  {file !== null ? (
                    <div className="item">
                      <Image
                        src={file ? URL.createObjectURL(file) : null}
                        alt={file ? file.name : null}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Button as="label" htmlFor="file" type="button">
                    Upload {imageName}
                  </Button>
                  <input
                    type="file"
                    id="file"
                    hidden
                    name={imageName}
                    onChange={fileHandler}
                    required
                  />
                </Form.Field>
              </div>
              <Button type="submit" color="green" fluid onClick={submit}>
                Register
              </Button>
            </Form>

            <Divider />
            <Label
              as="a"
              basic
              style={{ width: "100%" }}
              color="grey"
              onClick={signIn}
            >
              <Icon name="user" /> Already a member. Sign In
            </Label>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
