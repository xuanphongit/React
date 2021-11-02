import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { generateStore } from "../../../helpers/fake-data-helper"

const ModifyStoreModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [store] = useState(generateStore())
  const inputFileRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true)
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

  const { name, address, phone, image } = store

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="store-modify-modal"
    >
      <Modal.Header>Modify Store Information</Modal.Header>
      <Modal.Content image>
        <Image rounded fluid src={image} wrapped />
        <Modal.Description>
          <Form size={"small"}>
            <Form.Field>
              <label>Name</label>
              <input placeholder="Name" value={name} />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input placeholder="Phone" value={phone} />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input placeholder="Address" value={address} />
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

export default ModifyStoreModal
