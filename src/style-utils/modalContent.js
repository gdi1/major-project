import colors from "./colors";
import borders from "./borders";
import paddings from "./paddings";

/**
 * Reference
 *
 * CS3099 project
 *
 * This particular styling has been borrowed from the CS3099 project,
 * where my team has also made use of it to style the React modals throughout the entire application.
 */
export const modal_content = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `${colors.beige}`,
    border: `${borders.small}`,
    width: "30%",
    padding: `${paddings.small}`,
  },
  overlay: {
    background: "linear-gradient(rgba(0, 0, 0, 0.681), rgba(0, 0, 0, 0.68))",
    zIndex: 10000,
  },
};
