const getPercent = (percent) => {
  let newPercent = '';
  newPercent = `${percent}`;
  return newPercent.slice(0, 5);
}

export { getPercent };
