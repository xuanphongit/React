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
import shopApi from "../../api/shopApi"
import { useSelector } from "react-redux"

const Profile = () => {
  const history = useHistory()
  const { toastSuccess, toastError } = useToast()

  const data = useSelector(state => state.SignIn)
  const { phoneNumber } = data.signInInfor

  const UpdateInformation = () => {
    history.push("/admin")
  }

  const submit = event => {
    var form_data = new FormData(document.getElementById("update-form"))
    shopApi
      .Update(form_data)
      .then(response => {
        toastSuccess("Update shop information successfully")
        UpdateInformation()
      })
      .catch(error => {
        if (error.response) {
          toastError(error.response.data)
        }
      })
  }

  const [file, setFile] = React.useState(null)

  const fileHandler = e => {
    setFile(e.target.files[0])
  }

  const labelName = "Shop Name"
  const imageName = "Logo"

  return (
    <Container className="auth-form">
      <Image src="/logo/logo64.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Segment raised>
            <Divider />
            <Form id="update-form">
              <Form.Field>
                <label>{labelName}</label>
                <input placeholder={labelName} name="name" />
              </Form.Field>

              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  value={phoneNumber}
                  name="PhoneNumber"
                  readOnly
                />
              </Form.Field>

              <Form.Field>
                <label>New Phone Number</label>
                <input placeholder="New Phone Number" name="NewPhoneNumber" />
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

export default Profile
