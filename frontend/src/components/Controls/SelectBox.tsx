/** @jsxImportSource @emotion/react */

import Select from 'react-select';
import React from 'react';
import { COLOR } from '../../enumerations/color';
import { css } from '@emotion/react';

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
    color: COLOR.DARK_GRAY_900,
    paddingLeft: '1rem',
    cursor: 'pointer',
    backgroundColor: COLOR.LIGHT_GRAY_100,
  }),
  indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
  valueContainer: (styles) => ({ ...styles, padding: '0' }),
  menu: (styles) => ({
    ...styles,
    fontSize: '1.4rem',
    fontColor: COLOR.DARK_GRAY_900,
  }),
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
  defaultOption?: SelectOption;
}

const SelectBox: React.VFC<SelectBoxProps> = ({
  isMulti = false,
  options,
  placeholder,
  onChange,
  defaultOption,
}: SelectBoxProps) => (
  <div
    css={css`
      input {
        color: transparent !important;
        width: 100%;
      }

      > div {
        border: 2px solid transparent;
        border-radius: 0.6rem;
      }

      > div:hover {
        border: 2px solid ${COLOR.LIGHT_BLUE_500};
      }
    `}
  >
    <Select
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      styles={selectStyles}
      defaultValue={defaultOption}
      // theme={(theme) => ({ ...theme, colors: { ...theme.colors, primary: 'transparent' } })}
    />
  </div>
);

export default SelectBox;
