import * as React from 'react';
import Svg, {Path, G, Circle} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

function CoverPicChange() {
  return (
    <Svg width="27" height="27" viewBox="0 0 27 27">
      <G id="Group_86" data-name="Group 86" transform="translate(-339 -176)">
        <Circle
          id="Ellipse_103"
          data-name="Ellipse 103"
          cx="13.5"
          cy="13.5"
          r="13.5"
          transform="translate(339 176)"
          fill="#fff"
          opacity="0.566"
        />
        <G id="photo" transform="translate(345.967 184.419)">
          <Path
            id="Path_37"
            data-name="Path 37"
            d="M12.236,61.2H.83a.83.83,0,0,0-.83.83v8.5a.83.83,0,0,0,.83.83H12.236a.83.83,0,0,0,.83-.83v-8.5A.83.83,0,0,0,12.236,61.2Zm0,.83v6.033L10.6,66.577a.622.622,0,0,0-.858.021L8.088,68.252l-3.262-3.9a.622.622,0,0,0-.949-.006L.83,67.891v-5.86ZM8.711,64.208a1.141,1.141,0,1,1,1.141,1.141A1.141,1.141,0,0,1,8.711,64.208Z"
            transform="translate(0 -61.201)"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  );
}

export default CoverPicChange;
