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
            src="/logo/logo.png"
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
      <Header as="h1">Shopping Cart</Header>
      <p>
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum. Why do we use it? It is a long established fact
        that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using
        'Content here, content here', making it look like readable English. Many
        desktop publishing packages and web page editors now use Lorem Ipsum as
        their default model text, and a search for 'lorem ipsum' will uncover
        many web sites still in their infancy. Various versions have evolved
        over the years, sometimes by accident, sometimes on purpose (injected
        humour and the like).
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
        <Image centered size="mini" src="/logo/logo.png" />
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