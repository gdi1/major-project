import Drop from "./Drop";
import Drag from "./Drag";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import styled from "styled-components";
import { RowContainer } from "../../GeneralComponents/Containers";
import text_styles from "../../style-utils/text_styles";
import paddings from "../../style-utils/paddings";
import borders from "../../style-utils/borders";

const ConstraintsList = ({
  type,
  constraints,
  setEditInfo,
  setIsEditConstraintModalOpen,
}) => {
  const title = type === "hard" ? "Hard" : "Soft";
  return (
    <Drop id={type} style={{ width: "50%" }}>
      <RowContainer>
        <CenteredLabel>{title}</CenteredLabel>
      </RowContainer>
      {constraints.length === 0 && <RowContainer>No constraints.</RowContainer>}
      {constraints.length > 0 &&
        constraints.map((constraint, index) => {
          return (
            <Drag key={constraint.name} id={constraint.name} index={index}>
              <Constraint
                onClick={() => {
                  setEditInfo({
                    index,
                    type,
                    constraint,
                  });
                  setIsEditConstraintModalOpen(true);
                }}
              >
                {constraint.name}
              </Constraint>
            </Drag>
          );
        })}
    </Drop>
  );
};

const Constraint = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #${text_styles.colors.black};
  font-size: ${text_styles.resizbale_font.small_med};
  font-weight: bold;
  border: ${borders.small};
  padding: ${paddings.xsmall};
`;

export default ConstraintsList;
