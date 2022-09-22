import { useState } from "react";

const PostContactForm = async (
  values: any,
  successCallback: any,
  errorCallback: any
) => {
  if (true) successCallback();
  else errorCallback();
};

const initialFormValues = {
  name: "",
  num: "",
  edM: "",
  edY: "",
  cvc: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Can't be blank.";
    if ("num" in fieldValues) {
      temp.num = fieldValues.num ? "" : "Can't be blank.";
      if (fieldValues.num)
        temp.num = /^[0-9]{16}$/.test(fieldValues.num)
          ? ""
          : (temp.num = /^[0-9]{0,16}$/.test(fieldValues.num)
              ? "Wrong format. 16 digits"
              : "Wrong format. Numbers only");
    }
    if ("edM" in fieldValues) {
      temp.edM = fieldValues.edM ? "" : "Can't be blank.";
      if (fieldValues.edM)
        temp.edM = /^(1[0-2]|0[1-9]{0,2})$/.test(fieldValues.edM)
          ? ""
          : "Invalid Month";
    }
    if ("edY" in fieldValues) {
      temp.edY = fieldValues.edY ? "" : "Can't be blank.";
      if (fieldValues.edY)
        temp.edY = /^([1-9][0-9]|0[1-9]{0,2})$/.test(fieldValues.edY)
          ? ""
          : "Invalid Year";
    }
    if ("cvc" in fieldValues) {
      temp.cvc = fieldValues.cvc ? "" : "Can't be blank.";
      if (fieldValues.cvc)
        temp.cvc = /^[0-9]{3}$/.test(fieldValues.cvc)
          ? ""
          : (temp.cvc = /^[0-9]{0,3}$/.test(fieldValues.cvc)
              ? "Wrong format. 3 digits"
              : "Wrong format. Numbers only");
    }

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true,
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.name &&
      fieldValues.num &&
      fieldValues.edM &&
      fieldValues.edY &&
      fieldValues.cvc &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      await PostContactForm(values, handleSuccess, handleError);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  };
};
