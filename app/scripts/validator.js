export var validateString = (stringVal) => {
  if (stringVal.length === 0){
    return false;
  }
  return true;
}

export var validateNumber = (numberVal) => {
  var reg = /^\d+$/;
  if (numberVal.length === 0 || !reg.test(numberVal)){
    return false;
  }
  return true;
}
