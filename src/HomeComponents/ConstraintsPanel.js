import { constraintsActions } from "../store/constraints";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../GeneralComponents/Container";
import GeneralButton from "../GeneralComponents/GeneralButton";
import Drag from "./Drag";
import Drop from "./Drop";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { Constraint } from "./Constraint";
import Label from "../GeneralComponents/Label";

const ConstraintsPanel = () => {
  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mapIdToList = {
    soft: softConstraints,
    hard: hardConstraints,
  };

  const goToNewConstraintCreation = () => {
    navigate("/new-constraint");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;

    const constraint = mapIdToList[sourceListId][sourceIndex];

    dispatch(
      constraintsActions.removeConstraint({
        index: sourceIndex,
        type: sourceListId,
      })
    );
    dispatch(
      constraintsActions.addConstraint({
        constraint,
        index: destinationIndex,
        type: destinationListId,
      })
    );
  };
  return (
    <Container
      width={"50%"}
      border={"1px solid black"}
      flexDirection={"column"}
    >
      <Container
        justifyContent={"space-evenly"}
        style={{ marginBottom: "20px" }}
      >
        <GeneralButton>Solve configuration</GeneralButton>
        <GeneralButton onClick={goToNewConstraintCreation}>
          Add constraint
        </GeneralButton>
      </Container>
      <Container
        gap={"10px"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Drop id="hard" style={{ width: "50%" }}>
            <Label
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Hard
            </Label>
            {hardConstraints.length === 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No constraints.
              </div>
            )}
            {hardConstraints.length > 0 &&
              hardConstraints.map((constraint, index) => {
                return (
                  <Drag
                    key={constraint.name}
                    id={constraint.name}
                    index={index}
                  >
                    <Constraint>{constraint.name}</Constraint>
                  </Drag>
                );
              })}
          </Drop>
          <Drop id="soft" style={{ width: "50%" }}>
            <Label
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Soft
            </Label>
            {softConstraints.length === 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No constraints.
              </div>
            )}
            {softConstraints.length > 0 &&
              softConstraints.map((constraint, index) => {
                return (
                  <Drag
                    key={constraint.name}
                    id={constraint.name}
                    index={index}
                  >
                    <Constraint>{constraint.name}</Constraint>
                  </Drag>
                );
              })}
          </Drop>
        </DragDropContext>
      </Container>
    </Container>
  );
};
export default ConstraintsPanel;
