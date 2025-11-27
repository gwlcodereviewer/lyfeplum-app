/**
 * Name: IInput
 * Desc: Type declaration for input field
 */
export type IInput = {
  isRightIcon?: boolean;
  isValid?: boolean;
  color?: string;
  bgColor?: string;
  containerHeight?: number;
  marginTop?: number;
  textSize?: number;
};

/**
 * Name: ILabel
 * Desc: Type declaration for label
 */
export type ILabel = {
  color?: string;
};

/**
 * Name: ILoaderContainer
 * Desc: Type declaration for loader container
 */
export type ILoaderContainer = {
  color?: string;
  marginRight?: number;
  marginHorizontal?: number;
};

/**
 * Name: IInputText
 * Desc: Type declaration for input text
 */
export type IInputText = {
  isDescription?: boolean;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
};

/**
 * Name: IMediaIcon
 * Desc: Type declaration for media icon
 */
export interface IMediaIcon {
  marginRight?: number;
  marginLeft?: number;
}

/**
 * Name: IScreenWrapper
 * Desc: Type declaration for screen wrapper
 */
export type IScreenWrapper = {
  theme?: any;
};

/**
 * Name: ITextType
 * Desc: Type declaration for text type
 */
export type ITextType = {
  isSelected?: boolean;
};

/**
 * Name: ITraitsNameText
 * Desc: Type declaration for traits text
 */
export interface ITraitsNameText {
  isSelected?: number;
}

/**
 * Name: ISpacerProps
 * Desc: Type declaration for space
 */
export interface ISpacerProps {
  width?: number;
  height?: number;
}

/**
 * Name: IBorderProps
 * Desc: Type declaration for border
 */
export interface IBorderProps {
  isLeftBorder?: boolean;
  isRightBorder?: boolean;
}

/**
 * Name: ICustomMargin
 * Desc: Type declaration for margin
 */
export interface ICustomMargin {
  customMargin?: number;
}
