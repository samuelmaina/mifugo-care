const refData = {
  'petted-Animals': 'Cats',
  'poultry/Birds': 'Quail',
  Livestock: 'Oxen',
  'Domesticated wild': 'Foxes',
};

const predict = (speciality) => {
  switch (speciality) {
    case 'petted-Animals':
      return refData['petted-Animals'];
    case 'poultry/Birds':
      return refData['poultry/Birds'];
    case 'Livestock':
      return refData.Livestock;
    case 'Domesticated wild':
      return refData['Domesticated wild'];
    default:
      break;
  }
};

module.exports = predict;
