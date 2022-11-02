import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from 'react';

export interface IDatePickerProps {
    dayValue: Dayjs | null;
    setDayValue: Dispatch<SetStateAction<Dayjs | null>>;
    setLoadingGames: Dispatch<SetStateAction<boolean>>;
}

export default function DatePicker({ dayValue, setDayValue, setLoadingGames }: IDatePickerProps) {

    const handleChange = (newValue: Dayjs | null) => {
        setLoadingGames(true);
        setDayValue(newValue);
    };

    const handleBack = () => {
        setLoadingGames(true);
        setDayValue(dayValue?.subtract(1, 'day') || null);
    }

    const handleForward = () => {
        setLoadingGames(true);
        setDayValue(dayValue?.add(1, 'day') || null);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    inputFormat="MM/DD/YYYY"
                    value={dayValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <IconButton onClick={handleForward}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    backgroundColor: "rgba(0,0,0,.4)",
                    color: "white",
                    borderRadius: "25px",
                    padding: "20px 35px 10px",
                    display: { xs: "flex", md: "none" },
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <IconButton>
                    <ArrowBackIosIcon />
                </IconButton>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={dayValue}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <IconButton>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </LocalizationProvider>
    );
}
