import React from "react"
import {
  Container,
  Divider,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react"

import Gallery from "react-photo-gallery"
import { photos } from "./photo"
import { Link } from "react-router-dom"


const BasicRows = () => <Gallery photos={photos} />

const FixedMenuLayout = () => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header to="/home">
          <Image
            size="mini"
            src="/logo/logo32.png"
            style={{ marginRight: "1.5em" }}
          />
          Shopping Cart
        </Menu.Item>
        <Menu.Item as={Link} to="/home">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-in">
          Sign In
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-up">
          Sign Up
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Shopping Cart PhongMX</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p>
      <BasicRows />
    </Container>

    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Divider inverted section />
        <Image centered size="mini" src="/logo/logo64.png" />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
)

export default FixedMenuLayout