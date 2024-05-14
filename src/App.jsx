import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';


import { useFormik } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./redux/todoSlice";

import TodoForm from './components/TodoForm/TodoForm';
import GenericTable from './components/GenericTable/GenericTable';
import CustomDropDown from './components/CustomDropDown/CustomDropDown';

import {statusDropDownData} from "./utils/genericData";

import * as Yup from 'yup';

// import {getTodoList} from "./utils/todoAction";

import './App.css'

function App() {
  let todo = useSelector((store) => store.todo);
  let [tableList, setTableList] = useState(todo.todoList.map((item) => {
    return createData(item.id, item.title, item.status);
  }));
  
  //console.log(todo);
  const dispatch = useDispatch();

  useEffect(() => {
    setTableList(todo.todoList.map((item) => {
      return createData(item.id, item.title, item.status);
    }));
    
  }, [todo]);

  function createData(
    id,
    title,
    status
  ) {
    return { id, title, status };
  }
  
  // let rows = todo.todoList.map((item) => {
  //   return createData(item.id, item.title, item.status);
  // });

  const filterChangeHandler = (e) => {
    alert("Changed");
    if(e.target.value === -1) {
      todo = useSelector((store) => store.todo);
      rows = todo.todoList.map((item) => {
        return createData(item.id, item.title, item.status);
      });
    } else {
      rows = todo.todoList.filter((item) => {
        return item.status === e.target.value;
      });
    }
    
  }

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
              <div>
                <CustomDropDown dropDownValues={statusDropDownData} changeHandler={filterChangeHandler}/>
              </div>
              <GenericTable tableData={tableList} />
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
