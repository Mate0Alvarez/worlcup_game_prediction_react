import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppCtx } from "../../../context/ProdeContext";
import { IUserPredictionSaved } from "../../../interfaces/interfaces";
import { ProdeContextType } from "../../../types/types";
import SnackbarPush from "../../utils/SnackbarPush";

export interface IUpdatePredictionComponentProps {
    userPrediction: IUserPredictionSaved | null;
    local_score: string;
    visitor_score: string;
    setEditDisabled: Dispatch<SetStateAction<boolean>>;
    setUpdatePrediction: Dispatch<SetStateAction<boolean>>;
}

const UpdatePredictionComponent = ({
    userPrediction,
    local_score,
    visitor_score,
    setEditDisabled,
    setUpdatePrediction,
}: IUpdatePredictionComponentProps) => {
    const { updateUserPrediction } = useContext(AppCtx) as ProdeContextType;
    const [predictionError, setPredictionError] = useState<boolean>(false);
    const [predicitionSuccess, setPredicitionSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUpdatePrediction = async () => {
        setLoading(true);

        const prediction: IUserPredictionSaved = {
            prediction_id: userPrediction?.prediction_id || "",
            game_id: userPrediction?.game_id || "",
            local_score,
            visitor_score,
            result: getResult(local_score, visitor_score),
        };

        const update = await updateUserPrediction(prediction);

        if (!update) {
            setLoading(false);
            return setPredictionError(true);
        }

        setLoading(false);
        handleDismissUpdatePrediction();
        return setPredicitionSuccess(true);
    };

    const handleDismissUpdatePrediction = async () => {
        setEditDisabled(true);
        setUpdatePrediction(false);
    };

    const getResult = (local_score: string, visitor_score: string) => {
        if (local_score > visitor_score) {
            return "L";
        }
        if (local_score < visitor_score) {
            return "V";
        }
        return "D";
    };

    return (
        <>
            {predictionError && (
                <SnackbarPush
                    text_error="Ups! Something happend updating your prediction, please try again later"
                    severity="error"
                />
            )}
            {predicitionSuccess && (
                <SnackbarPush
                    text_error="Prediction updated!"
                    severity="primary"
                ></SnackbarPush>
            )}
            {!loading && (
                <>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleDismissUpdatePrediction}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={handleUpdatePrediction}
                    >
                        Update
                    </Button>
                </>
            )}
            {loading && (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress sx={{ borderRadius: 5 }} />
                </Box>
            )}
        </>
    );
};

export default UpdatePredictionComponent;
