import Container from "../GeneralComponents/Container";
import paddings from "../style-utils/paddings";
import { useSelector, useDispatch } from "react-redux";
import PreviewBlock from "./PreviewBlock";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { currentConstraintActions } from "../store/currentConstraint";
import React from "react";

const PreviewPanel = () => {
  const { constraintLists, focusedConstraint } = useSelector(
    (state) => state.currentConstraint
  );
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
    <Container
      height="90vh"
      border="1px solid black"
      padding={paddings.med}
      flexDirection={"column"}
      alignItems={"start"}
      justifyContent={"start"}
      overflow={"scroll"}
    >
      {constraintLists.map((list, x) => (
        <Container
          alignItems={"stretch"}
          height={"auto"}
          padding={paddings.small}
          onClick={() => setFocused(x)}
          focused={focusedConstraint === x}
          justifyContent={"safe start"}
          style={{
            width: `${(list.length - 1 + list[0]) * 200 + 55}px`,
          }}
        >
          <GeneralButton
            style={{ width: "25px" }}
            onClick={() => reduceIndentation(x)}
          >
            -
          </GeneralButton>
          <GeneralButton
            style={{ width: "25px" }}
            onClick={() => increaseIndentation(x)}
          >
            +
          </GeneralButton>
          <Container
            justifyContent={"safe start"}
            marginLeft={`${list[0] * 200 + 5}px`}
          >
            {list.slice(1).map((block, y) => (
              <PreviewBlock block={block} x={x} y={y + 1} />
            ))}
          </Container>
        </Container>
      ))}
    </Container>
  );
};
export default PreviewPanel;
