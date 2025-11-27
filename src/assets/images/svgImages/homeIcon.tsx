import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

/**
 * Use svg icon to show in bottom tab bar
 * @returns Home icon in bottom tab bar
 */
function HomeIcon(props: any) {
  return (
    <Svg width="30" height="30" viewBox="0 0 40.681 40.685">
      <Path
        id="home"
        d="M39.588,17.7l0,0L22.988,1.1a3.745,3.745,0,0,0-5.3,0L1.1,17.685l-.017.017A3.744,3.744,0,0,0,3.58,24.083q.057.006.115.006h.661V36.3A4.388,4.388,0,0,0,8.74,40.685h6.493a1.192,1.192,0,0,0,1.192-1.192V29.918a2,2,0,0,1,2-2h3.83a2,2,0,0,1,2,2v9.575a1.192,1.192,0,0,0,1.192,1.192H31.94A4.388,4.388,0,0,0,36.324,36.3V24.088h.613A3.746,3.746,0,0,0,39.588,17.7Zm0,0"
        transform="translate(0.001)"
        fill={props.color}
        stroke={props.strokeColor}
        stroke-width="1"
      />
    </Svg>
  );
}

export default HomeIcon;
