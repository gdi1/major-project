import Drop from "./Drop";
import Drag from "./Drag";
import { RowContainer } from "../../GeneralComponents/Containers";
import Constraint from "./Constraint";
import styled from "styled-components";
import { useSelector } from "react-redux";
import delete_icon from "./../../icons/delete_icon.png";
import text_styles from "../../style-utils/text_styles";
import { IconContainer, LargeIcon } from "../../GeneralComponents/Icons";
import { TooltipText } from "../../GeneralComponents/TooltipText";
import { TextWithEllipsisCSS } from "../../GeneralComponents/TextWithoutOverflow";

const ConstraintsList = ({
  type,
  constraints,
  setEditInfo,
  setIsEditConstraintModalOpen,
  setConstraintToDelete,
}) => {
  const { outdatedConstraints } = useSelector((state) => state.configurations);

  // const removeConstraint = (index) => {
  //   dispatch(constraintsActions.removeConstraint({ index, type }));
  // };
  return (
    <Drop
      id={type}
      style={{
        width: "100%",
      }}
    >
      {constraints.length === 0 && (
        <RowContainer>
          <NoConstraintsMessage>No constraints.</NoConstraintsMessage>
        </RowContainer>
      )}
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
                <IconContainer>
                  <DeleteIcon
                    src={delete_icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setConstraintToDelete(constraint.name);
                    }}
                  />
                  <TooltipText>Delete</TooltipText>
                </IconContainer>
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
  ${TextWithEllipsisCSS};
`;

const DeleteIcon = styled(LargeIcon)`
  cursor: pointer;
  justify-self: end;
`;

const NoConstraintsMessage = styled.div`
  font-size: ${text_styles.fonts.small};
  font-family: ${text_styles.styles.fontFamily};
`;

export default ConstraintsList;
