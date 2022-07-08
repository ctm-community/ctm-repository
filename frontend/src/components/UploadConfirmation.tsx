import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from 'react';
import { PercentCrop } from 'react-image-crop';
import { upload } from 'utilities/api';
import { canvasPreview } from '../utilities/preview';


export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (ok: boolean) => void;
  completedCrop: PercentCrop;
  image: HTMLImageElement;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, open, image, completedCrop, ...other } = props;

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    if (open && previewCanvasRef.current && completedCrop) {
      canvasPreview(
        image,
        previewCanvasRef.current,
        completedCrop
      );
    }
  }, [completedCrop, open, image]);

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      maxWidth="xs"
      // TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Image to Upload</DialogTitle>
      <DialogContent dividers sx={{
        overflowY: 'unset'
      }}>
        <canvas
          aria-label="crop preview"
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'contain',
            width: '100%'
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose(false)} aria-label="Cancel">
          Cancel
        </Button>
        <Button onClick={() => {
          if (previewCanvasRef.current) {
            previewCanvasRef.current.toBlob(function (blob) {
              if (blob === null) {
                throw new Error('Image was null');
              }

              upload(blob);

              let newImg = document.createElement('img');
              let url = URL.createObjectURL(blob);



              // newImg.onload = function () {
              //   // no longer need to read the blob so it's revoked
              //   URL.revokeObjectURL(url);
              // };

              newImg.src = url;
              document.body.appendChild(newImg);
            }, "image/webp", 0.75);
          }
          onClose(true);
        }} aria-label="Accept">Ok</Button>
      </DialogActions>
    </Dialog>
  );
}



interface IProps {
  image: HTMLImageElement,
  completedCrop: PercentCrop,
}

export default function ConfirmationDialog({ completedCrop, image }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (ok: boolean) => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickListItem}>Crop</Button>
      <ConfirmationDialogRaw
        id="upload-confirm"
        keepMounted
        open={open}
        completedCrop={completedCrop}
        image={image}
        onClose={handleClose} />
    </>
  );
}