export const getSizeName = (size) => {
  switch(size) {
    case "S":
      return "Small";
    case "M":
      return "Medium";
    case "L":
      return "Large";
    case "XL":
      return "Extra Large";
    default:
      return "Normal";
  }
}