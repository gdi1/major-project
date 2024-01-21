import colors from "./colors";
import borders from "./borders";

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
    backgroundColor: `#${colors.modal}`,
    border: `${borders.med}px solid #${colors.modal_border}`,
    width: "30%",
    padding: "40px",
  },
  overlay: {
    background: "linear-gradient(rgba(0, 0, 0, 0.681), rgba(0, 0, 0, 0.68))",
    zIndex: 10,
  },
};
