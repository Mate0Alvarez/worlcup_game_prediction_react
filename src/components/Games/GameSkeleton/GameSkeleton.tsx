import { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function GameSkeleton() {

  return (
    <>
      {["", "", "", ""].map((object, index) => (
        <Grid key={index} xs={10} md={6} item>
          <Skeleton
            sx={{
              backgroundColor: "rgba(0,0,0,.4)",
              backdropFilter: "blur(4px)",
              borderRadius: "25px",
              width: "100%"
            }}
            variant="rectangular"
            animation="wave"
            height={250}
          />
        </Grid>
      )
      )}
    </>
  );
}
