import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { MdDelete } from "react-icons/md";
import Checkbox from '@mui/material/Checkbox';

import { useDispatch } from "react-redux";
import { deleteTodo, updateStatus } from "../../redux/todoSlice";

const GenericTable = (props) => {
    const dispatch = useDispatch();
    const onDeleteHandler = (id) => {
        console.log("Clicked");
        dispatch(deleteTodo(id))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Operations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.tableData.map((row) => (
                      <TableRow
                        key={row.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="right">
                            <label>{row.status ? "Completed" : "Active"}</label>
                            <Checkbox checked={row.status} onClick={(e) => {
                              dispatch(updateStatus(row.id))
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
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default GenericTable;