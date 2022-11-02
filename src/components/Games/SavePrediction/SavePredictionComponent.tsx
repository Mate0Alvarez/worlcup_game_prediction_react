import { IGameResponse } from "../../../interfaces/interfaces";
import { useContext, useState, Dispatch, SetStateAction } from 'react';
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
  setPredictionError: Dispatch<SetStateAction<boolean>>;
  setPredictionSuccess: Dispatch<SetStateAction<boolean>>;
  predictionEnabled: boolean;
}

const SavePredictionComponent = ({
  game_id,
  local_score,
  visitor_score,
  setPredictionError,
  setPredictionSuccess,
  predictionEnabled
}: ISavePredictionComponentProps) => {
  const { userData, savePrediction } = useContext(AppCtx) as ProdeContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSavePrediction = async () => {
    setLoading(true);

    if (!predictionEnabled) {
      setLoading(false);
      return setPredictionError(true);
    }

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
    return setPredictionSuccess(true);
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
