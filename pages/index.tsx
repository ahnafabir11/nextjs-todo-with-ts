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
    setTodoList((state) => [...state, todoInputValue]);
    setTodoInputValue("");
  };

  const handleDeleteTodo = (deleteIndex: number) => {
    const updatedTodoList = todoList.filter(
      (todo, index) => index !== deleteIndex
    );
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (editValue: string, index: number) => {
    setIsEditing(true);
    setTodoInputValue(editValue);
    setEditAbleIndex(index);
  };

  const handleUpdateTodo = () => {
    setTodoList((state) => {
      state[editAbleIndex] = todoInputValue;
      return state;
    });
    setTodoInputValue("");
    setIsEditing(false);
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
            variant="outlined"
            value={todoInputValue}
            label={isEditing ? "Edit Todo" : "Add Todo"}
            onChange={(e) => setTodoInputValue(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={isEditing ? handleUpdateTodo : handleAddTodo}
          >
            {isEditing ? "edit" : "add"}
          </Button>
        </div>

        {/* showing list of todo */}
        <List component="div">
          {todoList.map((todo, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText primary={todo} />
                <IconButton onClick={() => handleDeleteTodo(index)}>
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
