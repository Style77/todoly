import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { changeTodo, deleteTodo } from "../api/todo"

const EditModal = ({ todo }) => {
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)
    const [visible, setVisible] = useState()

    const showModal = () => {
        setVisible(true)
    }
    
    return (
        <>
            {visible ?
                <>
                    <Button
                        onPress={() => showModal()}
                        color="error"
                        size="xs"
                        auto
                    >
                        <FaEdit />
                    </Button>
                    <Modal
                        closeButton
                        aria-labelledby="modal-title"
                        open={visible}
                        onClose={() => setVisible(false)}
                    >
                        <Modal.Header>
                            <Text id="modal-title" size={18}>
                                Edit
                                <Text b size={18}>
                                    {` ${todo.title}`}
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
                                onPress={() => { deleteTodo(todo.id); setVisible(false) }}
                                color="error"
                                auto
                            >
                                <FaTrash />
                            </Button>
                            <Button auto onPress={() => { changeTodo({ docId: todo.id, title: title, description: description }); setVisible(false) }}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                : <>
                    <Button
                        onPress={() => showModal()}
                        color="error"
                        size="xs"
                        auto
                    >
                        <FaEdit />
                    </Button>
                </>
            }
        </>
    )
}

export default EditModal