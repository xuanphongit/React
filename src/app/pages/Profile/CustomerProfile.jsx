import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Image,
  Segment,
} from "semantic-ui-react"
import customerApi from "../../api/customerApi"
import useToast from "../../hooks/useToast"

const CustomerProfile = () => {
  const history = useHistory()
  const { toastSuccess, toastError } = useToast()

  const userInfor = useSelector(state => state.SignIn)
  const { customerId, phoneNumber } = userInfor.signInInfor

  const [customer, setCustomer] = useState({})
  const [file, setFile] = React.useState(null)

  useEffect(() => {
    customerApi
      .Login({ phoneNumber: phoneNumber })
      .then(response => {
        setCustomer(response.data)
      })
      .catch(error => {
        toastError(error)
      })
  }, [])

  const { avatar, name } = customer

  const imgSrc = `data:image/jpeg;base64,${avatar}`

  const UpdateInformation = () => {
    history.push("/store")
  }

  const submit = event => {
    var form_data = new FormData(document.getElementById("update-form"))
    customerApi
      .Update(form_data)
      .then(response => {
        toastSuccess("Update customer information successfully")
        UpdateInformation()
      })
      .catch(error => {
        if (error.response) {
          toastError(error.response.data)
        }
      })
  }

  const fileHandler = e => {
    setFile(e.target.files[0])
  }

  const labelName = "Customer Name"
  const imageName = "Avatar"

  return (
    <Container className="auth-form">
      <Image src="/logo/cart-icon.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Segment raised>
            <Divider />
            <Form id="update-form">
              <Form.Field>
                <label>{labelName}</label>
                <input
                  placeholder={labelName}
                  name="name"
                  defaultValue={name}
                />
              </Form.Field>

              <Form.Field>
                <input name="customerId" defaultValue={customerId} hidden />
              </Form.Field>

              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  defaultValue={phoneNumber}
                  name="PhoneNumber"
                />
              </Form.Field>

              <div>
                <Form.Field>
                  <label>{imageName}</label>
                  {
                    <div className="item">
                      <Image
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : avatar
                            ? imgSrc
                            : "https://dummyimage.com/900x900/ecf0f1/aaa"
                        }
                        alt={file ? file.name : null}
                      />
                    </div>
                  }
                  <Button as="label" htmlFor="file" type="button">
                    Upload {imageName}
                  </Button>
                  <input
                    type="file"
                    id="file"
                    hidden
                    name={imageName}
                    onChange={fileHandler}
                  />
                </Form.Field>
              </div>
              <Button type="submit" color="green" fluid onClick={submit}>
                Update
              </Button>
            </Form>

            <Divider />
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default CustomerProfile
