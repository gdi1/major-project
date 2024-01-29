import Drop from "./Drop";
import Drag from "./Drag";
import { RowContainer } from "../../GeneralComponents/Containers";
import Constraint from "./Constraint";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import delete_icon from "./../../icons/delete_icon.png";
import { constraintsActions } from "../../store/constraints";

const ConstraintsList = ({
  type,
  constraints,
  setEditInfo,
  setIsEditConstraintModalOpen,
}) => {
  const { outdatedConstraints } = useSelector((state) => state.constraints);
  const dispatch = useDispatch();

  const removeConstraint = (index) => {
    dispatch(constraintsActions.removeConstraint({ index, type }));
  };
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
                outdated={outdatedConstraints.includes(constraint.name)}
              >
                <ConstraintName>{constraint.name}</ConstraintName>
                <Icon
                  src={delete_icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeConstraint(index);
                  }}
                />
              </Constraint>
            </Drag>
          );
        })}
    </Drop>
  );
};

const ConstraintName = styled.div`
  width: 100%;
  text-align: center;
`;

const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  justify-self: end;
`;

export default ConstraintsList;
