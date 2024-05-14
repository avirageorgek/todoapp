import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const CustomDropDown = (props) => {
    return (
        <>
            <FormControl sx={{width:"10%"}}>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.default}
                label="Age"
                onChange={
                    (e) => {
                        props.changeHandler(e)
                    }
                }
                >
                    {
                        props.dropDownValues.map((item, index) => {
                            return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        })
                    }
                    
                </Select>
            </FormControl>
        </>
    );
}

export default CustomDropDown;