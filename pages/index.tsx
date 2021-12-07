import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [todoList, setTodoList] = useState<Array<string>>([]);
  const [todoInputValue, setTodoInputValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editAbleIndex, setEditAbleIndex] = useState<number>(0);

  const handleAddTodo = () => {
    if (!todoInputValue) return;
    setTodoList([...todoList, todoInputValue]);
    setTodoInputValue("");
  };

  const handleDeleteTodo = (deleteValue: string) => {
    const updatedTodoList = todoList.filter((todo) => todo !== deleteValue);
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (editValue: string, index: number) => {
    setIsEditing(true);
    setTodoInputValue(editValue)
    setEditAbleIndex(index)
  };

  const handleUpdateTodo = () => {
    let updatedList = todoList;
    updatedList[editAbleIndex] = todoInputValue;
    setTodoList(updatedList)
    setTodoInputValue("")
    setIsEditing(false)
  };

  return (
    <div>
      <Head>
        <title>TypeScript Todo App</title>
        <meta name="description" content="simple todo ap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        {/* todo input */}
        <div className={styles.todoInputContainer}>
          <TextField
            fullWidth
            size="small"
            label="Todo"
            variant="outlined"
            value={todoInputValue}
            onChange={(e) => setTodoInputValue(e.target.value)}
          />
          <Button variant="contained" onClick={isEditing ?  handleUpdateTodo : handleAddTodo}>
            {isEditing ? "edit" : "add"}
          </Button>
        </div>

        {/* showing list of todo */}
        <List component="nav">
          {todoList.map((todo, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText primary={todo} />
                <IconButton onClick={() => handleDeleteTodo(todo)}>
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton onClick={() => handleEditTodo(todo, index)}>
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </main>
    </div>
  );
};

export default Home;
