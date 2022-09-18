import React from "react"
import {
    Container,
    Button,
    Textarea,
    Input,
    Grid,
    Switch,
    Spacer,
    Card,
} from "@nextui-org/react"
import useAuth from "../../hooks/useAuth"
import { addTodo } from "../api/todo"
import { FaCheck, FaTimes } from "react-icons/fa"

const AddTodo = () => {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [status, setStatus] = React.useState("pending")
    const [isLoading, setIsLoading] = React.useState(false)

    const { isLoggedIn, user } = useAuth()
    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            // toast({
            //     title: "You must be logged in to create a todo",
            //     status: "error",
            //     duration: 9000,
            //     isClosable: true,
            // })
            return
        }
        setIsLoading(true)
        const todo = {
            title,
            description,
            status,
            userId: user.uid,
        }
        await addTodo(todo)
        setIsLoading(false)
        setTitle("")
        setDescription("")
        setStatus("pending")
        // toast({ title: "Todo created successfully", status: "success" })
    }
    return (
        <Container>
            <Grid>
                <Grid.Container>
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid.Container>
                <Spacer y={0.5}></Spacer>
                <Grid.Container>
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid.Container>
                <Spacer y={0.3}></Spacer>
                <Grid.Container>
                    <Button onClick={() => handleTodoCreate()} disabled={title.length < 1 || description.length < 1 || isLoading || !isLoggedIn}>
                        Add
                    </Button>
                </Grid.Container>
            </Grid>
        </Container>
    )
}
export default AddTodo