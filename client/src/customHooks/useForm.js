import { useState } from "react";

export default function useForm(initialState, callback) {
  const [formInputs, setFormInputs] = useState(initialState);

  const handleInputChange = (e) => {
    e.persist();
    setFormInputs((inputs) => ({
      ...inputs,
      [e.target.name]:
        e.target.name === "hints"
          ? e.target.value.split(",")
          : e.target.name === "points"
          ? Number(e.target.value)
          : e.target.name === "file"
          ? e.target.files[0]
          : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    callback();
  };

  const resetFields = () => {
    setFormInputs(initialState);
  };
  return {
    formInputs,
    handleInputChange,
    handleSubmit,
    resetFields,
  };
}
