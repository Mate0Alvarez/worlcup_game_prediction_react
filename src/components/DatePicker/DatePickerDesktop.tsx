import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {IDatePickerBox} from '../../interfaces/interfaces';

const DatePickerDesktop = ({dayValue, handleBack, handleChange, handleForward}:IDatePickerBox) => {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(0,0,0,.4)",
                backdropFilter: "blur(4px)",
                color: "white",
                borderRadius: "25px",
                padding: "20px 35px 10px",
                display: { xs: "none", md: "flex" },
                justifyContent: "space-around",
                alignItems: "center",
                mb: 2
            }}
        >
            <IconButton onClick={handleBack}>
                <ArrowBackIosIcon />
            </IconButton>
            <DesktopDatePicker
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

export default DatePickerDesktop