import React from "react";
import Select, { OptionsType, OptionTypeBase } from "react-select";
import makeAnimated from "react-select/animated";
import { STATUS_OPTIONS, TYPE_OPTIONS } from "../../../Redux/Constants";
import css from "./Dropdowns.module.css";
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
        className={css["react-select--inline"]}
        classNamePrefix={css["react-select"]}
        closeMenuOnSelect={false}
        components={makeAnimated()}
        defaultValue={STATUS_OPTIONS}
        isMulti
        options={STATUS_OPTIONS}
        onChange={handleStatusChangeOptions}
      />
      <Select
        className={css["react-select--inline"]}
        classNamePrefix={css["react-select"]}
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
