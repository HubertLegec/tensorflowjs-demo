
export async function base64ToImageData(base64Image, outputSize) {
  const image = new Image();
  const arrayLikeImage = new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = outputSize;
      canvas.height = outputSize;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, outputSize, outputSize);

      const imageData = context.getImageData(0, 0, outputSize, outputSize);
      let monodata = [];
      for (let i=0, len = imageData.data.length / 4; i < len; i += 1) {
        monodata.push(imageData.data[i * 4 + 3]);
        monodata.push(0);
        monodata.push(0);
        monodata.push(0);
      }
      let monoimgdata = new ImageData(new Uint8ClampedArray(monodata), 28, 28);

      resolve(monoimgdata);
    };
  });
  image.src = base64Image;
  return arrayLikeImage;
}

export function lastArrayItem(array) {
  if (!array || array.length === 0) {
    return undefined;
  }
  return array[array.length - 1];
}
