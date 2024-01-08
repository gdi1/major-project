import { ColumnContainer, RowContainer } from "../GeneralComponents/Containers";
import paddings from "../style-utils/paddings";
import { useSelector, useDispatch } from "react-redux";
import PreviewBlock from "./PreviewBlock";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { currentConstraintActions } from "../store/currentConstraint";
import React from "react";
import borders from "../style-utils/borders";
import styled from "styled-components";

const blockWidth = 220;

const PreviewPanel = () => {
  const { constraintLists, focusedConstraint } = useSelector(
    (state) => state.currentConstraint
  );
  console.log(constraintLists);
  const dispatch = useDispatch();
  const setFocused = (x) => {
    if (x === focusedConstraint) return;
    dispatch(currentConstraintActions.setFocused(x));
  };
  const reduceIndentation = (x) => {
    if (x !== focusedConstraint) return;
    dispatch(currentConstraintActions.reduceIndentation(x));
  };
  const increaseIndentation = (x) => {
    if (x !== focusedConstraint) return;
    dispatch(currentConstraintActions.increaseIndentation(x));
  };
  return (
    <ConstraintPanel>
      {constraintLists.map((list, x) => (
        <ConstraintRow
          onClick={() => setFocused(x)}
          width={(list.length - 1 + list[0]) * blockWidth + 55}
          focused={focusedConstraint === x}
          key={x}
        >
          <IndentationButton onClick={() => reduceIndentation(x)}>
            -
          </IndentationButton>
          <IndentationButton onClick={() => increaseIndentation(x)}>
            +
          </IndentationButton>
          <BlocksList indentation={list[0] * blockWidth + 5}>
            {list.slice(1).map((block, y) => (
              <PreviewBlock block={block} x={x} y={y + 1} />
            ))}
          </BlocksList>
        </ConstraintRow>
      ))}
    </ConstraintPanel>
  );
};
const IndentationButton = styled(GeneralButton)`
  width: 25px;
  height: 60px;
`;
const ConstraintPanel = styled(ColumnContainer)`
  height: 90vh;
  border: ${borders.small};
  padding: ${paddings.small};
  align-items: start;
  justify-content: start;
  overflow: scroll;
`;

const ConstraintRow = styled(RowContainer)`
  align-items: stretch;
  height: auto;
  padding: ${paddings.xsmall};
  justify-content: safe-start;
  width: ${(props) => props.width}px;
  background-color: ${(props) => (props.focused ? "blue" : "white")};
`;
const BlocksList = styled(RowContainer)`
  justify-content: safe start;
  margin-left: ${(props) => props.indentation}px;
`;
export default PreviewPanel;
