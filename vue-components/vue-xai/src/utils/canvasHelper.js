const WORK_CANVAS = document.createElement('canvas');
WORK_CANVAS.width = 100;
WORK_CANVAS.height = 100;

export function getPixels(width, height, values, convert) {
  const ctx = WORK_CANVAS.getContext('2d');
  const rawPixels = ctx.createImageData(width, height);
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const idx = i + j * width;
      // const idxDst = i + (height - j - 1) * width;
      const value = convert(values[idx]);
      rawPixels.data[idx * 4 + 0] = value[0];
      rawPixels.data[idx * 4 + 1] = value[1];
      rawPixels.data[idx * 4 + 2] = value[2];
      rawPixels.data[idx * 4 + 3] = 255; // Opaque
    }
  }
  return rawPixels;
}
