import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { IDatePickerBox } from '../../interfaces/interfaces';



const DatePickerMobile = ({dayValue, handleBack, handleChange, handleForward}:IDatePickerBox) => {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(0,0,0,.4)",
                backdropFilter: "blur(4px)",
                color: "white",
                borderRadius: "25px",
                padding: "20px 10px 10px",
                display: { xs: "flex", md: "none" },
                justifyContent: "space-around",
                alignItems: "center"
            }}
        >
            <IconButton onClick={handleBack}>
                <ArrowBackIosIcon />
            </IconButton>
            <MobileDatePicker
                label="Date"
                inputFormat="DD/MM/YYYY"
                value={dayValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
            <IconButton onClick={handleForward}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    )
}

export default DatePickerMobile