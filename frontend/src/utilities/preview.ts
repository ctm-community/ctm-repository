import { ASPECT_RATIO } from 'pages/UploadMap';
import { PercentCrop } from 'react-image-crop';

/**
 * 
 * @param image Image to render
 * @param canvas Canvas to render onto
 * @param crop Crop Object
 */
export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PercentCrop,
) {
  // this code is derived from a code example from the react-image-crop library.

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  // const pixelRatio = window.devicePixelRatio;

  // canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  // canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  // ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  // const cropX = crop.x * scaleX;
  // const cropY = crop.y * scaleY;

  // const centerX = image.naturalWidth / 2;
  // const centerY = image.naturalHeight / 2;

  // ctx.save();

  // let scale = 2;

  // ctx.scale(2, 2);

  canvas.height = canvas.width;

  [canvas.width, canvas.height] = [600 * ASPECT_RATIO, 600];
  //[canvas.width * 2, canvas.height * 2];

  ctx.drawImage(
    image,
    crop.x / 100 * image.naturalWidth,
    crop.y / 100 * image.naturalHeight,
    crop.width / 100 * image.naturalWidth,
    crop.height / 100 * image.naturalHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  // ctx.restore();
}
