import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */
/**
 * Use svg icon to show in bottom tab bar
 * @returns Media icon in bottom tab bar
 */
function MediaIcon(props: any) {
  return (
    <Svg width="33.284" height="27.287" viewBox="0 0 33.284 27.287">
      <G
        id="photo-camera-interface-symbol-for-button"
        transform="translate(0.5 0.5)">
        <Path
          id="Path_22"
          data-name="Path 22"
          d="M21.349,18.682a5.206,5.206,0,1,1-5.207-5.207A5.212,5.212,0,0,1,21.349,18.682Zm10.935-7.393V26.077a3.57,3.57,0,0,1-3.57,3.57H3.57A3.57,3.57,0,0,1,0,26.077V11.289a3.57,3.57,0,0,1,3.57-3.57H7.961V6.484A3.123,3.123,0,0,1,11.084,3.36H21.2a3.123,3.123,0,0,1,3.124,3.124V7.718h4.391A3.571,3.571,0,0,1,32.284,11.289Zm-8.258,7.393a7.884,7.884,0,1,0-7.884,7.884A7.893,7.893,0,0,0,24.026,18.682Z"
          transform="translate(0 -3.36)"
          fill={props.color}
          stroke={props.strokeColor}
          stroke-width="1"
        />
      </G>
    </Svg>
  );
}

export default MediaIcon;
