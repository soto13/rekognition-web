const getPercent = (percent) => {
  let newPercent = '';
  newPercent = `${percent}`;
  return newPercent.slice(0, 5);
}

const convertImage64ToFileInBase64 = (imageBase64) => {
  let fileBase64 = '';
  fileBase64 = imageBase64.replace("data:image/jpeg;base64,", '');
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
