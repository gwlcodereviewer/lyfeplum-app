import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
/* SVG has dropped some elements not supported by react-native-svg: filter */

/**
 * Name: TapImage
 * desc: render svg of tap image
 */
function TapImage() {
  return (
    <Svg width="52.5" height="40.682" viewBox="0 0 52.5 40.682">
      <G id="tap" transform="translate(0.25 -53.083)">
        <G
          id="Group_20"
          data-name="Group 20"
          transform="translate(6.111 56.986)">
          <G id="Group_19" data-name="Group 19" transform="translate(0 0)">
            <Path
              id="Path_18"
              data-name="Path 18"
              d="M97.663,97.387,88.775,87.62a4.524,4.524,0,0,0-6.4.014,4.424,4.424,0,0,0-1.144,1.955A4.528,4.528,0,0,0,74.14,91.95a4.529,4.529,0,0,0-5.945.411,4.474,4.474,0,0,0-1.135,1.907l-4.188-4.188a4.524,4.524,0,0,0-6.4,6.4l16.092,16.092-9.544,1.5a5.3,5.3,0,0,0-4.524,5.217,3.55,3.55,0,0,0,3.545,3.545H84.329a12.914,12.914,0,0,0,9.192-3.808l3.718-3.718a12.984,12.984,0,0,0,.423-17.919Zm-2.094,16.248-3.718,3.718a10.566,10.566,0,0,1-7.521,3.115H62.042a1.182,1.182,0,0,1-1.182-1.182,2.924,2.924,0,0,1,2.513-2.879l11.854-1.863a1.181,1.181,0,0,0,.652-2L58.145,94.808A2.161,2.161,0,0,1,61.2,91.752l11.825,11.825A1.182,1.182,0,1,0,74.7,101.9l-4.829-4.829a2.161,2.161,0,0,1,3.056-3.056l4.831,4.831a1.182,1.182,0,1,0,1.669-1.673l-2.465-2.465a2.161,2.161,0,0,1,3.056-3.056l2.477,2.477s0,0,0,0l0,0,0,0,0,0h0a0,0,0,0,1,0,0,1.182,1.182,0,0,0,1.647-1.695l-.1-.1a2.162,2.162,0,0,1,3.016-3.1l8.849,9.726a10.623,10.623,0,0,1-.348,14.657Z"
              transform="translate(-55.153 -86.302)"
              fill="#325a4b"
              stroke="#fff"
              stroke-width="0.5"
            />
          </G>
        </G>
        <G id="Group_22" data-name="Group 22" transform="translate(0 53.333)">
          <G id="Group_21" data-name="Group 21" transform="translate(0 0)">
            <Path
              id="Path_19"
              data-name="Path 19"
              d="M20.318,59.6A10.626,10.626,0,1,0,6.271,73.653,1.183,1.183,0,0,0,7.245,71.5a8.262,8.262,0,1,1,10.92-10.92,1.182,1.182,0,1,0,2.153-.974Z"
              transform="translate(0 -53.333)"
              fill="#325a4b"
              stroke="#fff"
              stroke-width="0.5"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default TapImage;
