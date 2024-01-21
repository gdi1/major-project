import Drop from "./Drop";
import Drag from "./Drag";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import { RowContainer } from "../../GeneralComponents/Containers";
import Constraint from "./Constraint";

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

export default ConstraintsList;
