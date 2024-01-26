import Drop from "./Drop";
import Drag from "./Drag";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import Constraint from "./Constraint";
import styled from "styled-components";

const ConstraintsList = ({
  type,
  constraints,
  setEditInfo,
  setIsEditConstraintModalOpen,
}) => {
  return (
    <Drop
      id={type}
      style={{
        width: "100%",
      }}
    >
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

// const ConstraintListContainer = styled.div`
//   width: 40%;
// `;
// display: flex;

export default ConstraintsList;
