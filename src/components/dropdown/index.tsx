import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';
import {strings} from '../../localization';
import {DropDownContainer} from './styled';

/**
 * Name: Props
 * Desc: Interface declaration for props
 */
interface Props {
  data?: any;
  onChange?: any;
  dropDownLabel?: string;
  selectedValue?: string;
  isSearch?: boolean;
  isChapter?: boolean;
}

/**
 * Name: DropdownComponent
 * Desc: Component to render the Dropdown
 * @param {any} data - data of dropdown
 * @param {func} onChange - Function to catch value of dropdown on change
 * @param {string} dropDownLabel - label of dropdown
 * @param {string} selectedValue - selected value of dropdown
 * @param {boolean} isSearch - If true, then search will be active.
 * @param {boolean} isChapter - If true, then dropdown is rendering in chapter screen.
 * @returns React component
 */
const DropdownComponent: React.FC<Props> = (props: Props) => {
  const {
    data,
    onChange,
    dropDownLabel,
    selectedValue,
    isSearch = true,
    isChapter,
  } = props;
  const [value, setValue] = useState(selectedValue ? selectedValue : null);
  const [isFocus, setIsFocus] = useState(false);

  /**
   * Name: useEffect
   * Desc: useEffect to update the dropdown value on render
   */
  useEffect(() => {
    setValue(selectedValue ? selectedValue : null);
  }, [selectedValue]);

  return (
    <DropDownContainer
      color={isChapter ? colors.pantone : colors.white}
      marginHorizontal={isChapter ? rpx(20) : rpx(0)}>
      <Dropdown
        style={[styles.dropdown]}
        data={data}
        search={isSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? dropDownLabel : '...'}
        searchPlaceholder={strings.search}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          setValue(item.value);
          setIsFocus(false);
          if (onChange) {
            onChange(item.value);
          }
        }}
      />
    </DropDownContainer>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: rpx(50),
    borderColor: defaultTheme.secondaryBorderColor,
    borderWidth: rpx(0.5),
    borderRadius: rpx(15),
    paddingHorizontal: rpx(8),
    backgroundColor: colors.labelBackground,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: rpx(16),
  },
  selectedTextStyle: {
    fontSize: rpx(16),
  },
  iconStyle: {
    width: rpx(20),
    height: rpx(20),
  },
  inputSearchStyle: {
    height: rpx(40),
    fontSize: rpx(16),
  },
});
