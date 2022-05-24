import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { MinecraftMap } from 'utilities/api';
import { getPublicPath } from 'utilities/env';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  paddingLeft: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

/**
 * Properties used by MapCard
 */
export interface IMapCardProps {
  map: MinecraftMap
}

/**
 * Creates a Card component given a map, displaying the most essential properties
 * @param {{ map: MinecraftMap }} props The map to display
 * @returns {JSX.Element} the view
 */
export default function MapCard({ map }: IMapCardProps): JSX.Element {
  const id = map.id;
  const name = map.name;

  const nav = useNavigate();

  const expand = () => {
    nav('/maps/' + encodeURIComponent(id) + '/' +
      encodeURIComponent(name.toLowerCase().replace(' ', '-')));
  }

  return (
    <Card className="map-card">
      <CardActionArea onClick={expand} aria-label='map card'>
        <CardMedia
          component="img"
          image={getPublicPath(map.image_url)}
          alt="Map Image"
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold" marginTop="-1vh">
            {map.name}
          </Typography>
          <Divider />
          <Stack direction="row" alignItems="left" gap={1} marginBottom="1vh" marginTop="1vh">
            <Stack direction="row" alignItems="left" gap={1}>
              <PersonIcon fontSize="small" />
              <Typography className='author' variant="subtitle2">{map.author} </Typography>
            </Stack>
            <Stack direction="row" alignItems="left" gap={1}>
              <DownloadIcon fontSize="small" />
              <Typography className='download_count' variant="subtitle2">{map.download_count}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="left" gap={1}>
            <Item elevation={0} variant="outlined">
              <Typography className='mc_version' variant="caption">Minecraft {map.mc_version}</Typography>
            </Item>
            <Item elevation={0} variant="outlined">
              <Typography className='length' variant="caption">{map.length} Map</Typography>
            </Item>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card >
  );
}
