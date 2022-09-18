import { Container, Grid, Spacer } from "@nextui-org/react"
import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"
import CustomNavbar from "./components/Navbar";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <CustomNavbar />
      <Grid.Container gap={5}>
        <Grid>
          <AddTodo />
        </Grid>
        <Spacer x={40} />
        <Grid>
          <TodoList />
        </Grid>
      </Grid.Container>
    </Layout>
  );
}