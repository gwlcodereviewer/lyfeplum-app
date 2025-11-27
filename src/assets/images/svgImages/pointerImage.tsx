import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

/**
 * Name: PointerImage
 * desc: render svg of Pointer image
 */
function PointerImage() {
  return (
    <Svg width="30" height="42.791" viewBox="0 0 30 42.791">
      <G id="pointer" transform="translate(-68.929 0)">
        <G id="Group_18" data-name="Group 18" transform="translate(68.929 0)">
          <Path
            id="Path_17"
            data-name="Path 17"
            d="M98.7,27.539,75.48.326a.927.927,0,0,0-1.308-.1A.9.9,0,0,0,73.856.8L68.938,36.251a.93.93,0,0,0,.789,1.048.912.912,0,0,0,.687-.176l9.455-7.2,3.581,12.2a.934.934,0,0,0,1.151.631l5.1-1.5a.934.934,0,0,0,.631-1.151L86.827,28.17l11.1.9a.939.939,0,0,0,1-.854A.9.9,0,0,0,98.7,27.539ZM85.63,26.194a.939.939,0,0,0-1,.854.825.825,0,0,0,.037.334l3.628,12.34-3.322.974-3.7-12.6a.934.934,0,0,0-1.151-.631.813.813,0,0,0-.3.148l-8.74,6.653L75.415,3.091,95.846,27.019Z"
            transform="translate(-68.929 0)"
            fill="#325a4b"
          />
        </G>
      </G>
    </Svg>
  );
}

export default PointerImage;
