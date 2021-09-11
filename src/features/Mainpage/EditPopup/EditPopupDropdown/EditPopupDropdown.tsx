import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { STATUS_OPTIONS } from "../../../../common/Constants";

interface PropType {
  status: string;
  setStatus: CallableFunction;
}

function EditPopupDropdown({ status, setStatus }: PropType) {
  const handleStatusChange = (e: any) => {
    setStatus(e.value);
  };

  return (
    <Select
      classNamePrefix="react-select"
      closeMenuOnSelect={true}
      components={makeAnimated()}
      defaultValue={STATUS_OPTIONS.filter((type) => type.value === status)}
      options={STATUS_OPTIONS}
      onChange={handleStatusChange}
    />
  );
}

export default EditPopupDropdown;
