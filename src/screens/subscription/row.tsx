import camelCase from 'lodash/camelCase';
import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import colors from '../../../styles/colors';
import {
  LabelText,
  RowContainer,
  RowFieldContainer,
  RowMainContainer,
  ValueText,
} from './styled';

interface RowField {
  label: string;
  value: string;
}

interface RowProps {
  children?: ReactNode;
  fields: RowField[];
  flexDirection?: ViewStyle['flexDirection'];
  isLast?: boolean;
}

export const Row = ({children, fields, isLast}: RowProps) => (
  <RowMainContainer style={[styles.row, isLast && styles.rowLast]}>
    <RowContainer>
      {fields.map((field, index) => (
        <RowFieldContainer
          style={[styles.row, fields.length - 1 === index && styles.rowLast]}
          key={camelCase(field.label)}>
          <LabelText>{field.label}</LabelText>
          <ValueText>{field.value}</ValueText>
        </RowFieldContainer>
      ))}
    </RowContainer>

    {children}
  </RowMainContainer>
);

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
  },
  rowParent: {
    marginTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },

  rowLastParent: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  rowLast: {
    marginBottom: 0,
  },
});
