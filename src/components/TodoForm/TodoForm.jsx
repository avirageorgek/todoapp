import { useState } from 'react'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/todoSlice";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TodoForm = (props) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          title: ''
        },
        validationSchema: Yup.object({
          title: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .required('Please enter a title name.'),
        }),
        onSubmit: values => {
          console.log("Submited");
          dispatch(addTodo({
            id: uuidv4(),
            title: values.title,
            status: false
          }));
          props.handleClose();
        },
    
    });

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container columnSpacing={2} display="flex" rowSpacing={3}>
                <Grid item xs={12} md={12}>
                  <TextField id="outlined-basic" fullWidth size="small" label="Title" variant="outlined" {...formik.getFieldProps('title')} />
                  {formik.touched.title && formik.errors.title ? (
                    <div className='error-message'>{formik.errors.title}</div>
                  ) : null}
                </Grid>
                <Grid item sm={12} md={12} textAlign="center">
                  <Button variant="contained" type="submit">Add Todo</Button>  
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>    
      </Modal>
    );
}

export default TodoForm;