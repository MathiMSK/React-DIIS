import Select from "react-select";

const CustomSelect = (props) => {
  const {
    option,
    placeholder,
    styles,
    disabled,
    setSelectedOptions,
    selectedOptions,
    isSearchable,
    isMulti,
  } = props;
  const handleSelect = (data) => {
    setSelectedOptions(data);
  };
  return (
    <Select
      defaultValue={selectedOptions}
      styles={styles}
      options={option}
      placeholder={placeholder}
      value={selectedOptions}
      onChange={handleSelect}
      isSearchable={isSearchable}
      isMulti={isMulti}
      isDisabled={disabled}
    />
  );
};

export default CustomSelect;