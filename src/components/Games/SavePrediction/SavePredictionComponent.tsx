import { IGameResponse } from "../../../interfaces/interfaces";
import { useContext, useState } from "react";
import { AppCtx } from "../../../context/ProdeContext";
import { ProdeContextType } from "../../../types/types";
import SnackbarPush from "../../utils/SnackbarPush";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export interface ISavePredictionComponentProps {
  game_id: string;
  local_score: string;
  visitor_score: string;
}

const SavePredictionComponent = ({
  game_id,
  local_score,
  visitor_score,
}: ISavePredictionComponentProps) => {
  const { userData, savePrediction } = useContext(AppCtx) as ProdeContextType;
  const [predictionError, setPredictionError] = useState<boolean>(false);
  const [predicitionSuccess, setPredicitionSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSavePrediction = async () => {
    setLoading(true);

    const prediction: IGameResponse = {
      user_id: userData.id,
      game_id,
      result: {
        local_score,
        visitor_score,
        result: getResult(local_score, visitor_score),
      },
    };

    const predictionSaved = await savePrediction(prediction);
    if (!predictionSaved) {
      setLoading(false);
      return setPredictionError(true);
    }

    setLoading(false);
    return setPredicitionSuccess(true);
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
          text_error="Ups! Something happend saving your prediction, please try again later"
          severity="error"
        ></SnackbarPush>
      )}
      {predicitionSuccess && (
        <SnackbarPush
          text_error="Prediction saved!"
          severity="primary"
        ></SnackbarPush>
      )}

      {!loading && (
        <Button
          variant="outlined"
          color="success"
          onClick={handleSavePrediction}
        >
          Save prediction
        </Button>
      )}
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress sx={{ borderRadius: 5 }} />
        </Box>
      )}
    </>
  );
};

export default SavePredictionComponent;
