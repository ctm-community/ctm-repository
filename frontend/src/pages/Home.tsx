import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import MapCard from "components/MapCard";
import SearchBar from "components/SearchBar";
import ErrorPage from "pages/ErrorPage";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetMapsSearch } from "utilities/api";
import { getPublicPath } from 'utilities/env';



/**
 * View of home page
 * @returns {JSX.Element} the view
 */
export default function Home() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const mapsPerPage = 12;
  let searchTerm = searchParams.get('q');
  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
    setPage(1);
  };

  // useFetch has a bug where an empty string makes it not fetch data but pretend it did, so if searchTerm is empty,
  // it will use Infinity instead. An object cannot be used because React will complain
  const [isLoading, searchResult, searchError] = useGetMapsSearch(searchTerm || '', page, [searchTerm || Infinity], mapsPerPage);

  if (searchError) {
    return <ErrorPage error={searchError} />;
  }
  else {
    return (
      <Grid container className="home-page-layout" alignItems="center" justifyContent="center" spacing={1}>
        <Grid item xs={12} md={8}>
          <Card className="map-card" elevation={0} style={{ backgroundColor: "transparent" }}>
            <CardMedia
              component="img"
              image={getPublicPath('/banner.webp')}
              alt="CTM Repository Banner"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={10} md={8} marginLeft="1em" marginRight="1em">
          <SearchBar
            onSearch={handleSearch}
            defaultValue={searchTerm || ''}
          />
        </Grid>
        <Grid item xs={12} margin="1em">
          <Paper className="search-results-display" sx={{ p: 2 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              divider={<Divider orientation="horizontal" flexItem />}
              spacing={2}
            >
              <Pagination
                count={searchResult.max_page}
                page={page}
                onChange={(_, e) => { setPage(e) }}
                variant="outlined"
                shape="rounded"
              />
              {(isLoading || searchResult == null) ? (
                <div>Loading...</div>
              ) : (
                <div data-testid='home-map-display'>
                  <Grid container spacing={2}>
                    {searchResult.data.map((map, index) => (
                      <Grid item key={map.id} xs={12} sm={6} lg={4} xl={3} width="100%">
                        <MapCard map={map} key={index} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
              <Pagination
                count={searchResult.max_page}
                page={page}
                onChange={(_, e) => { setPage(e) }}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: '1em' }}

              />
            </Stack>
          </Paper>
        </Grid>
        <Box sx={{ mx: "auto", width: 175 }}>
          <Card className="banner" elevation={0} style={{ backgroundColor: "#CCCCCC", justifyContent: "center", display: "flex" }}>
            <CardActions >
              <Link href="https://ctm.community/">
                Discord
              </Link>
              <Link href="https://www.patreon.com/14er">
                Patreon
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    );
  }
}
