import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

/**
 * Name: GridViewIcon
 * Desc: Use svg icon to show grid view icon
 * @returns grid view icon
 */
function GridViewIcon() {
  return (
    <Svg
      fill="#fff"
      width="30px"
      height="30px"
      viewBox="0 0 52 52"
      data-name="Layer 1"
      id="Layer_1">
      <Path d="M14,16H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H14a2,2,0,0,1,2,2V14A2,2,0,0,1,14,16ZM4,12h8V4H4Z" />
      <Path d="M14,34H2a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H14a2,2,0,0,1,2,2V32A2,2,0,0,1,14,34ZM4,30h8V22H4Z" />
      <Path d="M32,16H20a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V14A2,2,0,0,1,32,16ZM22,12h8V4H22Z" />
      <Path d="M32,34H20a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V32A2,2,0,0,1,32,34ZM22,30h8V22H22Z" />
    </Svg>
  );
}

export default GridViewIcon;
