const getPercent = (percent) => {
  let newPercent = '';
  newPercent = `${percent}`;
  return newPercent.slice(0, 5);
}

const convertImage64ToFileInBase64 = (imageBase64) => {
  const png = 'image/png';
  const jpg = 'image/jpg';
  const jpeg = 'image/jpeg';
  let fileBase64 = '';
  fileBase64 = imageBase64.replace("data:image/jpeg;base64,", '');
  if (imageBase64.indexOf(jpg) === -1) {
    console.log('jpg', imageBase64)
  }
  if (imageBase64.indexOf(jpeg) === -1) {
    console.log('jpeg')
  }
  if (imageBase64.indexOf(png) === -1) {
    console.log('png')
  }
  return fileBase64;
}

const typeMobile = () => {
  if (window.screen.width < 600) {
    return 'MOBILE';
  }
  if (window.screen.width < 900 && window.screen.width > 600) {
    return 'TABLET';
  }
  if (window.screen.width > 900) {
    return 'MONITOR';
  }
}

export { getPercent, convertImage64ToFileInBase64, typeMobile };
