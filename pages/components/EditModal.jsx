import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { changeTodo, deleteTodo } from "../api/todo"

const EditModal = ({ todo, visible, closeHandler }) => {
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)

    const updateHandler = () => {
        changeTodo({ docId: todo.id, title: title, description: description })
        closeHandler()
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Edit
                    <Text b size={18}>
                        { ` ${todo.title}` }
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    clearable
                    color="primary"
                    size="lg"
                    value={title}
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    minLength={3}
                />
                <Input
                    clearable
                    color="primary"
                    size="lg"
                    value={description}
                    label="Desc"
                    onChange={(e) => setDescription(e.target.value)}
                    minLength={5}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onPress={() => () => deleteTodo(todo.id)}
                    color="error"
                    auto
                >
                    <FaTrash />
                </Button>
                <Button auto onPress={updateHandler}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal