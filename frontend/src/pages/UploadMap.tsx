import { Button, Card, CardContent, Grid, Stack, styled, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import ReactCrop, {
  centerCrop, Crop, makeAspectCrop, PercentCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { IfElse } from 'utilities/helpers';
import ConfirmationDialog from '../components/UploadConfirmation';


const Input = styled('input')({
  display: 'none',
});


export const ASPECT_RATIO = 16 / 9;

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      ASPECT_RATIO,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function UploadMap() {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PercentCrop>();

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height))
  }

  return (
    <Grid
      container
      spacing={0}
      marginTop="5vh"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={11} sm={10} md={8} lg={6}>
        <Card sx={{ minWidth: 300, minHeight: 300 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
              Map Upload
            </Typography>
            <Stack direction="column" alignItems="center" spacing={2}>
              <IfElse condition={!Boolean(imgSrc)}
                ifChildren={
                  <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" onChange={onSelectFile} aria-label="select image" />
                    <Button variant="contained" component="span" aria-label="upload image">
                      Upload Image
                    </Button>
                  </label>
                }

                elseChildren={
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(_, percentCrop) => {
                      setCompletedCrop(percentCrop);
                    }}
                    aspect={ASPECT_RATIO}
                  >
                    <img
                      style={{ objectFit: "scale-down" }}
                      ref={imgRef}
                      alt="Crop me"
                      src={imgSrc}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                }
              />
              {(imgRef.current && completedCrop) ?
                <ConfirmationDialog image={imgRef.current} completedCrop={completedCrop}></ConfirmationDialog>
                : <></>}

            </Stack>
            { /* <!-- className="Crop-Controls" --> */}

          </CardContent>
        </Card>

      </Grid>
    </Grid >
  )
}