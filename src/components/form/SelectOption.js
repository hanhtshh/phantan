import React from "react";
import { Select } from "@windmill/react-ui";

const SelectOption = ({ onChange, register, name, label }) => {

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        // {...register(`${name}`, {
        //   required: `${label} is required!`,
        // })}
        onChange={(value) => {
          onChange(value.target.value);
        }}
      >
        <option value="" defaultValue hidden>{label}</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4 </option>
        <option value={5}>5 </option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </Select>
    </>
  );
};

export default SelectOption;
