import Select from 'react-select';
import React from 'react';
import { COLOR } from '../../enumerations/color';

// const selectStyles = {
//   option: (provided, state) => ({
//     // ...provided,
//     // borderBottom: '1px dotted pink',
//     // color: state.isSelected ? 'red' : 'blue',
//     // padding: 20,
//   }),
//   control: () => ({
//     // none of react-select's styles are passed to <Control />
//     // width: 200,
//   }),
//   singleValue: (provided, state) => {
//     // const opacity = state.isDisabled ? 0.5 : 1;
//     // const transition = 'opacity 300ms';
//     // return { ...provided, opacity, transition };
//   },
// };

const selectStyles = {
  container: (styles) => ({
    ...styles,
    fontSize: '1.4rem',
  }),
  control: (styles) => ({
    ...styles,
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    fontColor: COLOR.DARK_GRAY_900,
    minHeight: '2.4rem',
    height: '2.4rem',
  }),
  indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
  valueContainer: (styles) => ({ ...styles, padding: '0' }),
  menu: (styles) => ({ ...styles, fontSize: '1.4rem', fontColor: COLOR.DARK_GRAY_900 }),
  // option: (styles, state) => ({ ...styles, backgroundColor: state.isSelected ? 'red' : 'blue' }),
};

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectBoxProps {
  isMulti?: boolean;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (option: { value: string; label: string }) => void;
}

const SelectBox: React.VFC<SelectBoxProps> = ({
  isMulti = false,
  options,
  placeholder,
  onChange,
}: SelectBoxProps) => (
  <Select
    isMulti={isMulti}
    options={options}
    placeholder={placeholder}
    onChange={onChange}
    styles={selectStyles}
    // theme={(theme) => ({ ...theme, colors: { ...theme.colors, primary: 'transparent' } })}
  />
);

export default SelectBox;
