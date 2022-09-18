import {
    Badge,
    Container,
    Heading,
    Grid,
    Text,
    Button,
    Checkbox,
    Table,
    Switch,
    useAsyncList,
    Spacer,
    Card
} from "@nextui-org/react"
import React, { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { FaEdit, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa"
import { deleteTodo, toggleTodoStatus } from "../api/todo"
import EditModal from "./EditModal"

const TodoList = () => {
    const [todos, setTodos] = React.useState([])
    const { user } = useAuth()

    const [ editModalVisible, setEditModalVisible ] = React.useState(false)

    const closeHandler = () => setEditModalVisible(false)


    const refreshData = () => {
        if (!user) {
            setTodos([])
            return
        }
        const q = query(collection(db, "todo"), where("user", "==", user.uid))
        onSnapshot(q, (querySnapchot) => {
            let ar = []
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() })
            })
            setTodos(ar)
        })
    }

    useEffect(() => {
        refreshData()
    }, [user])
    
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed"
        await toggleTodoStatus({ docId: id, status: newStatus })
        // toast({
        //     title: `Todo marked ${newStatus}`,
        //     status: newStatus == "completed" ? "success" : "warning",
        // })
    }
    return (
        <Container>
            <Grid.Container>
                <Grid>
                    <Table aria-label="Todo list"
                        shadow="true"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}>
                        <Table.Header>
                            <Table.Column>TITLE</Table.Column>
                            <Table.Column>DESCRIPTION</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {todos &&
                                todos.map((todo) => (
                                    <Table.Row>
                                        <Table.Cell>
                                            <Text>{todo.title}</Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Text>{todo.description}</Text>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Badge
                                                color={
                                                    todo.status == "completed"
                                                        ? "success"
                                                        : "warning"
                                                }
                                                size="md"
                                                css={{ border:"#ff5e57" }}
                                            >
                                                {todo.status}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Switch
                                                onChange={() =>
                                                    handleToggle(todo.id, todo.status)
                                                }
                                                checked={
                                                    todo.status == "completed"
                                                        ? true
                                                        : false
                                                }
                                                color="success"
                                                size="xs"
                                                iconOn={<FaToggleOn />}
                                                iconOff={<FaToggleOff />}
                                                auto
                                            />
                                            <Button
                                                onPress={() => setEditModalVisible(true)}
                                                color="error"
                                                size="xs"
                                                auto
                                            >
                                                <FaEdit />
                                            </Button>
                                            <EditModal todo={todo} visible={editModalVisible} closeHandler={closeHandler} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </Grid>
            </Grid.Container>
        </Container>
    )
}
export default TodoList