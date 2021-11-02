import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { generateMenuItem } from "../../helpers/fake-data-helper"

const MenuDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setItem] = useState({})
  const inputFileRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open(id) {
      setIsOpen(true)

      if (id) {
        setItem(generateMenuItem())
      } else {
        setItem({})
      }
    },
  }))

  const chooseFile = e => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files)
  }
  const requestChooseFile = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }

  const { image, name, price, description } = menu

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="menu-modify-modal"
    >
      <Modal.Header>Modify Menu</Modal.Header>
      <Modal.Content image>
        {menu && (
          <>
            <Image
              rounded
              fluid
              src={image || "https://dummyimage.com/900x900/ecf0f1/aaa"}
              wrapped
            />
            <Modal.Description>
              <Form size={"small"}>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="Name" value={name} />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input placeholder="Price" value={price} />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <textarea placeholder="Description" value={description} />
                </Form.Field>
                <Form.Field>
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={requestChooseFile}
                  >
                    <Button>
                      <Icon name="upload" />
                      Upload File
                    </Button>
                    <Label basic pointing="left">
                      {image || "Please select image"}
                    </Label>
                  </Button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={inputFileRef}
                    onChange={chooseFile}
                    accept="image/*"
                  />
                </Form.Field>
              </Form>
            </Modal.Description>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setIsOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default MenuDetailModal
