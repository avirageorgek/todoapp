import {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../redux/todoSlice";

const GenericTable = (props) => {
    const dispatch = useDispatch();
    const [editableRow, setEditableRow] = useState(null);
    const [newValue, setNewValue] = useState(null);
    const [isValid, setIsValid] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const onDeleteHandler = (id) => {
        console.log("Clicked");
        dispatch(deleteTodo(id))
    }

    const editValidation = (value) => {
      if(value.length < 5) {
        setErrorMessage("Must be 5 characters or more");
        setIsValid(false);
        return;
      } 
      setIsValid(true);
      setErrorMessage("");
    }

    const saveTitle = (event, id, newTitle) => {
      console.log(event.keyCode)
      if (event.keyCode === 13) {
        console.log("test");
        if(!isValid) {
          return;
        }
        console.log("dispatched");
        dispatch(updateTodo({id: id, element: "title", value: newTitle}))
        setEditableRow(false);
      }  
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Operations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      props.tableData.length > 0 ?
                        
                          props.tableData.map((row, index) => (
                            <TableRow
                              key={row.title}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {
                                  editableRow === index ? <>
                                  <TextField id="outlined-basic" size="small" defaultValue={row.title} 
                                  onChange={(e) => {
                                    editValidation(e.target.value)
                                  }} onKeyDown={(e) => {
                                    saveTitle(e, row.id, e.target.value)
                                  }}  label="Title" variant="outlined" />
                                    <div className='error-message'>{errorMessage}</div>
                                    
                                  </>
                                  
                                  : row.title
                                }
                                {
                                  editableRow === null || editableRow !== index ? 
                                  <IconButton aria-label="edit" size="small" color="primary" onClick={
                                    (e) => {
                                      if(editableRow === null) {
                                        setEditableRow(index)
                                      } else {
                                        setEditableRow(null)
                                      }
                                      
                                    }
                                  }> 
                                    <FaEdit />
                                  </IconButton>: 
                                  ""
                                }
                                
                                      
                              </TableCell>
                              <TableCell align="right">
                                {row.status}
                                  <label>{row.status ? "Completed" : "Active"}</label>
                                  <Checkbox checked={row.status} onClick={(e) => {
                                    dispatch(updateTodo({id: row.id, element: "status", value: !row.status}))
                                  }}  />
                                  {row.status}
                              </TableCell>
                              <TableCell align='right'>
                                  <IconButton aria-label="delete" color="primary" onClick={
                                      (e) => {
                                          onDeleteHandler(row.id);
                                      }
                                  }>
                                      <MdDelete />
                                  </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                       :
                        <h4>Sorry, no items to display</h4>
                      }  

                  </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default GenericTable;