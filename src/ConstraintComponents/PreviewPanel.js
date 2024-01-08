import {
  ColumnContainer,
  Container,
  RowContainer,
} from "../GeneralComponents/Containers";
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
          style={{
            width: `${(list.length - 1 + list[0]) * blockWidth + 55}px`,
            backgroundColor: focusedConstraint === x ? "blue" : "white",
          }}
          key={x}
        >
          <IndentationButton onClick={() => reduceIndentation(x)}>
            -
          </IndentationButton>
          <IndentationButton onClick={() => increaseIndentation(x)}>
            +
          </IndentationButton>
          <BlocksList
            justifyContent={"safe start"}
            style={{ marginLeft: `${list[0] * blockWidth + 5}px` }}
          >
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
`;
const BlocksList = styled(RowContainer)`
  justify-content: safe start;
`;
export default PreviewPanel;
