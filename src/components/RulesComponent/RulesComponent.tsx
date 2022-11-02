import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Grid from '@mui/material/Grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const RulesComponent = () => {
    return (
        <Box
            sx={{
                backgroundColor: "primary.dark",
                backgroundImage: "url(/background.svg)",
                backgroundSize: "cover",
                minHeight: "65vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
            }}
        >
            <Grid
                container
                maxWidth="lg"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                    justifyContent: "center",
                    mb: 5,
                    backgroundColor: "rgba(0,0,0,.4)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "25px",
                    color: "#fff",
                    p:1
                }}
            >
                <Grid xs={12} item >
                    <Typography
                        variant="h3"
                    >
                        Rules:
                    </Typography>
                </Grid>
                <Grid xs={12} item >
                    <Typography
                        variant="h6"
                    >
                        Points:
                    </Typography>
                </Grid>
                <Grid xs={12} item >
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="In case you guess the overall result you will add 2 points."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="In case you guess the number of goals of a team you will add 1 point per guess. In this way, if you guess the result and the exact number of goals of a team, you will add 4 points in total."
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid xs={12} item >
                    <Typography
                        variant="h6"
                    >
                        Predictions:
                    </Typography>
                </Grid>
                <Grid xs={12} item >
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="You can make a result prediction up to 1 hour before the match starts."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="You can edit a prediction as many times as you need as long as you are within the stipulated time limit."
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RulesComponent