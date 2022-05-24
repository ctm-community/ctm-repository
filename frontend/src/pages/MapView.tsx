import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ErrorPage from "pages/ErrorPage";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMap } from "utilities/api";
import { getPublicPath } from "utilities/env";



/**
 * Display information about a single map
 * It gets information via url parameters
 * Checks the validity of URL parameters before
 * rendering view. Renders NoMatch if the parameter is
 * missing or invalid.
 * @returns {JSX.Element} the view
 */
export default function MapView() {
  const params = useParams();
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
  const [isLoading, map, error] = useGetMap(parseInt(params.id || ""));
  const navigate = useNavigate();

  setTimeout(() => {
    setMinimumTimeElapsed(true);
  }, 250);

  if (error) {
    return <ErrorPage error={error} />;
  }
  else {
    return (
      <Grid
        container
        spacing={0}
        marginTop="5vh"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={11} sm={10} md={8} lg={6}>
          <Card className="map-card">
            <CardActionArea onClick={() => navigate("/")} aria-label="Home">
              {(!minimumTimeElapsed || isLoading || map == null) ? (
                <Skeleton variant="rectangular" width="100%" height="40vh" />
              ) : (
                <CardMedia
                  component="img"
                  image={getPublicPath(map.image_url)}
                  alt="Map Image"
                />
              )}
              {(!minimumTimeElapsed || isLoading || map == null) ? (
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" >
                    <Skeleton variant="text" />
                  </Typography>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              ) : (
                <CardContent aria-label="Map Information">
                  <Typography gutterBottom variant="h5" component="div">
                    {map.name}
                  </Typography>
                  <List dense={true}>
                    <ListItem>
                      <ListItemText primary="Map Series" secondary={map.series} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Author" secondary={map.author} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Upload Date" secondary={map.upload_date} />
                    </ListItem>
                  </List>
                </CardContent>
              )}
            </CardActionArea>
          </Card>
        </Grid>
      </Grid >
    )
  }
}
