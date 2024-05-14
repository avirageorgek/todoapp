import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';


import { useFormik } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./redux/todoSlice";

import TodoForm from './components/TodoForm/TodoForm';
import GenericTable from './components/GenericTable/GenericTable';

import * as Yup from 'yup';

// import {getTodoList} from "./utils/todoAction";

import './App.css'

function App() {
  const todo = useSelector((store) => store.todo);
  console.log(todo);
  const dispatch = useDispatch();

  function createData(
    id,
    title,
    status
  ) {
    return { id, title, status };
  }
  
  const rows = todo.todoList.map((item) => {
    return createData(item.id, item.title, item.status);
  });

  return (
    <>
      <Grid container spacing={0}>
        <Grid item sm={0} md={1}>

        </Grid>
        <Grid item sm={0} md={10}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TodoForm />
            </Grid>

            <Grid item xs={12}>
              <GenericTable tableData={rows} />
            </Grid>
          </Grid>  
        </Grid>  
        <Grid item sm={0} md={1}>

        </Grid>
      </Grid>
    </>
  )
}

export default App
