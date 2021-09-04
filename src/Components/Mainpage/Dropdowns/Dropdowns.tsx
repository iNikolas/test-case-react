import React from "react";
import Select, { OptionsType, OptionTypeBase } from "react-select";
import makeAnimated from "react-select/animated";
import { STATUS_OPTIONS, TYPE_OPTIONS } from "../../../Redux/Constants";
import "./Dropdowns.css";
import { useAppDispatch } from "../../../Redux/hooks";
import {
  defineStatusFilters,
  defineTypeFilters,
} from "../../../Redux/transactionsSlice";

function Dropdowns() {
  const dispatch = useAppDispatch();

  const handleStatusChangeOptions = (
    e: OptionTypeBase | OptionsType<OptionTypeBase> | null
  ) => {
    const values = e?.map((val: { value: string; label: string }) => val.value);
    dispatch(defineStatusFilters(values));
  };

  const handleTypeChangeOptions = (
    e: OptionTypeBase | OptionsType<OptionTypeBase> | null
  ) => {
    const values = e?.map((val: { value: string; label: string }) => val.value);
    dispatch(defineTypeFilters(values));
  };

  return (
    <div>
      <Select
        className="react-select--inline"
        classNamePrefix="react-select"
        closeMenuOnSelect={false}
        components={makeAnimated()}
        defaultValue={STATUS_OPTIONS}
        isMulti
        options={STATUS_OPTIONS}
        onChange={handleStatusChangeOptions}
      />
      <Select
        className="react-select--inline"
        classNamePrefix="react-select"
        closeMenuOnSelect={false}
        components={makeAnimated()}
        defaultValue={TYPE_OPTIONS}
        isMulti
        options={TYPE_OPTIONS}
        onChange={handleTypeChangeOptions}
      />
    </div>
  );
}

export default Dropdowns;
