import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from 'react';
import DatePickerDesktop from './DatePickerDesktop';
import DatePickerMobile from './DatePickerMobile';

export interface IDatePickerContainerProps {
    dayValue: Dayjs | null;
    setDayValue: Dispatch<SetStateAction<Dayjs | null>>;
    setLoadingGames: Dispatch<SetStateAction<boolean>>;
}

export default function DatePickerContainer({ dayValue, setDayValue, setLoadingGames }: IDatePickerContainerProps) {

    const handleChange = async (newValue: Dayjs | null): Promise<void> => {
        setLoadingGames(true);
        setDayValue(newValue);
    };

    const handleBack = async (): Promise<void> => {
        setLoadingGames(true);
        setDayValue(dayValue?.subtract(1, 'day') || null);
    }

    const handleForward = async (): Promise<void> => {
        setLoadingGames(true);
        setDayValue(dayValue?.add(1, 'day') || null);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerDesktop
                dayValue={dayValue}
                handleBack={handleBack}
                handleChange={handleChange}
                handleForward={handleForward}
            />
            <DatePickerMobile
                dayValue={dayValue}
                handleBack={handleBack}
                handleChange={handleChange}
                handleForward={handleForward}
            />
        </LocalizationProvider>
    );
}
