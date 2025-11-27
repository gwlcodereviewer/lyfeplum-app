import * as React from 'react';
import Svg, {Polygon} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

/**
 * Name: Plus
 * Desc: Function to render plus icon.
 * @returns JSX.Element
 */
function Plus(props: any) {
  return (
    <Svg
      width={props.width ? props.width : 24}
      height={props.height ? props.height : 24}
      viewBox="0 0 24 24"
      fill="#000">
      <Polygon
        fill-rule="evenodd"
        points="13 11 22 11 22 13 13 13 13 22 11 22 11 13 2 13 2 11 11 11 11 2 13 2"
      />
    </Svg>
  );
}

export default Plus;
