import * as React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

function ProfilePicChange() {
  return (
    <Svg width="27" height="27" viewBox="0 0 27 27">
      <G id="Group_85" data-name="Group 85" transform="translate(-183 -221)">
        <Circle
          id="Ellipse_111"
          data-name="Ellipse 111"
          cx="13.5"
          cy="13.5"
          r="13.5"
          transform="translate(183 221)"
          fill="#fff"
        />
        <G id="photo" transform="translate(189.967 229.419)">
          <Path
            id="Path_37"
            data-name="Path 37"
            d="M12.236,61.2H.83a.83.83,0,0,0-.83.83v8.5a.83.83,0,0,0,.83.83H12.236a.83.83,0,0,0,.83-.83v-8.5A.83.83,0,0,0,12.236,61.2Zm0,.83v6.033L10.6,66.577a.622.622,0,0,0-.858.021L8.088,68.252l-3.262-3.9a.622.622,0,0,0-.949-.006L.83,67.891v-5.86ZM8.711,64.208a1.141,1.141,0,1,1,1.141,1.141A1.141,1.141,0,0,1,8.711,64.208Z"
            transform="translate(0 -61.201)"
            fill="#c8b4a0"
          />
        </G>
      </G>
    </Svg>
  );
}

export default ProfilePicChange;
