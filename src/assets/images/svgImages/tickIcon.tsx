import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

/**
 * Name: Cross
 * Desc: Function to render cross icon.
 * @returns JSX.Element
 */
function TickIcon(props: any) {
  return (
    <Svg
      width={props.width ? props.width : 18}
      height={props.height ? props.height : 18}
      viewBox="0 0 20 19.84"
      fill="#000">
      <Path d="M15.39,5.66a.37.37,0,0,0-.52,0L8,13.39,5.09,11.06a.38.38,0,1,0-.47.59L7.85,14.2a.38.38,0,0,0,.52,0l7.06-8A.38.38,0,0,0,15.39,5.66Z" />
    </Svg>
  );
}

export default TickIcon;
