import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../../redux/todoSlice";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = () => {
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
        },
    
    });

    return (
        <form onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={10}>
              <TextField id="outlined-basic" fullWidth size="small" label="Title" variant="outlined" {...formik.getFieldProps('title')} />
              {formik.touched.title && formik.errors.title ? (
                <div className='error-message'>{formik.errors.title}</div>
              ) : null}
            </Grid>
            <Grid item sm={12} md={2}>
              <button type="submit">Add Todo</button>  
            </Grid>
          </Grid>
        </form>
    );
}

export default TodoForm;