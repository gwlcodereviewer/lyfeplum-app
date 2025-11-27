import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */
/**
 * Use svg icon to show in bottom tab bar
 * @returns share icon in bottom tab bar
 */
function ShareIcon(props: any) {
  return (
    <Svg width="33.284" height="27.287" viewBox="0 0 30.378 27.23">
      <G id="share-option" transform="translate(0.5 0.5)">
        <Path
          id="Path_23"
          data-name="Path 23"
          d="M29.067,36.113,20.673,27.72a1.049,1.049,0,0,0-1.787.738v4.2H15.214q-11.689,0-14.345,6.607A14.929,14.929,0,0,0,0,44.72a19.687,19.687,0,0,0,2.082,7.394q.049.115.172.393T2.475,53a1.863,1.863,0,0,0,.213.36.56.56,0,0,0,.459.279.479.479,0,0,0,.385-.164.611.611,0,0,0,.139-.41,3.338,3.338,0,0,0-.041-.435,3.391,3.391,0,0,1-.041-.385q-.082-1.114-.082-2.016a13.954,13.954,0,0,1,.287-2.967,8.909,8.909,0,0,1,.8-2.271A5.7,5.7,0,0,1,5.9,43.335,7.7,7.7,0,0,1,7.631,42.2a9.377,9.377,0,0,1,2.18-.7,20.79,20.79,0,0,1,2.525-.353q1.271-.1,2.877-.1h3.672v4.2a1.043,1.043,0,0,0,1.787.738l8.394-8.394a1.03,1.03,0,0,0,0-1.476Z"
          transform="translate(0 -27.408)"
          fill={props.color}
          stroke={props.strokeColor}
          stroke-width="1"
        />
      </G>
    </Svg>
  );
}

export default ShareIcon;
