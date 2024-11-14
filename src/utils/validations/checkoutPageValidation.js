export const validateCheckoutPage = ({ formInfo, formSchema, setErrors }) => {
  Object.keys(formSchema).forEach((parentKey) => {
    Object.keys(formSchema[parentKey]).forEach((childKey) => {
      formSchema[parentKey][childKey] = "";
    })
  })
  // console.log("formSchema", formSchema)
  const newFormSchema = { ...formSchema };
  if (formInfo.addressDetials.fullName)
    newFormSchema.addressDetials.fullName = "";
  else newFormSchema.addressDetials.fullName = "Please enter full name";
  if (formInfo.addressDetials.address)
    newFormSchema.addressDetials.address = "";
  else newFormSchema.addressDetials.address = "Please enter address";
  if (formInfo.addressDetials.city) newFormSchema.addressDetials.city = "";
  else newFormSchema.addressDetials.city = "Please enter city name";
  newFormSchema.addressDetials.pincode = validatePin(
    formInfo.addressDetials.pincode
  );
  if (formInfo.addressDetials.country)
    newFormSchema.addressDetials.country = "";
  else newFormSchema.addressDetials.country = "Please enter country name";
  newFormSchema.cardDetails.cardNo = validateCardNo(
    formInfo.cardDetails.cardNo
  );
  newFormSchema.cardDetails.expDate = validateExpDate(
    formInfo.cardDetails.expDate
  );
  newFormSchema.cardDetails.cvv = validateCvv(formInfo.cardDetails.cvv);
  setErrors(newFormSchema);

  return new Promise((resolve, reject) => {
    let isError = false;
    Object.keys(newFormSchema).forEach((parentKey) => {
      Object.keys(newFormSchema[parentKey]).forEach((childKey) => {
        if(newFormSchema[parentKey][childKey]) isError = true;
      })
    })
    console.log("isError", isError)
    if(isError) {
      reject("Please fill all the details");
    } else resolve()
  })
};

export function validatePin(pin) {
  if (pin?.length === 0) return "Please enter pin no";
  else if (pin?.length < 6) return "Please enter minimum 6 character";
  if (pin?.length > 6) return "Please enter maximum 6 character";
  else if (isNaN(pin)) return "Please enter a valid pin no";
  return "";
}

export function validateCardNo(cardNo) {
  if (cardNo?.length === 0) return "Please enter card no";
  else if (cardNo?.length < 16) return "Please enter minimum 16 character";
  if (cardNo?.length > 16) return "Please enter maximum 16 character";
  else if (isNaN(cardNo)) return "Please enter a valid card no";
  return "";
}

export function validateCvv(cvv) {
  if (cvv?.length === 0) return "Please enter cvv";
  else if (cvv?.length < 3) return "Please enter minimum 3 character";
  if (cvv?.length > 3) return "Please enter maximum 3 character";
  else if (isNaN(cvv)) return "Please enter a valid cvv";
  return "";
}

function validateExpDate(expDate) {
  console.log(expDate);
  if (expDate?.length === 0) return "Please enter exp date";
  else if (expDate?.length < 7) return "Please enter minimum 7 character";
  if (expDate?.length > 7) return "Please enter maximum 3 character";
  else if (isNaN(expDate?.split("/")?.[0]) || isNaN(expDate?.split("/")?.[1])) {
    return "Please enter a valid exp date";
  }
  return "";
}
