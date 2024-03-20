import { keyframes } from "styled-components";
import colors from "../style-utils/colors";

/**
 * References
 *
 * GfG, “How to Create Fade-in Effect on Page Load Using CSS ?,” GeeksforGeeks,
 * n.d., https://www.geeksforgeeks.org/how-to-create-fade-in-effect-on-page-load-using-css/.
 */

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/**
 * References
 *
 * “A Pen By Josh Branchaud,” codepen.io, n.d.,
 * https://codepen.io/jbranchaud/pen/vYYqQjO.
 */
export const pulseAnimation = keyframes`
  0%, 100% {
    background-color: ${colors.beige};
  }
  50% {
    background-color: ${colors.brick};
  }
`;

/**
 * References
 *
 * CSS Spin Animation, n.d., https://codepen.io/teerapuch/pen/vLJXeR.
 *
 * “W3Schools Online HTML Editor,” W3Schools Online Web Tutorials,
 * n.d., https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader2.
 */
export const spinning_animation = keyframes`
  0% { 
    transform: rotate(0deg); 
  }

  100% { 
    transform: rotate(360deg); 
  }
`;
