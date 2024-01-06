import { constraintsActions } from "../../store/constraints";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../GeneralComponents/Container";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import Drag from "./Drag";
import Drop from "./Drop";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { Constraint } from "./Constraint";
import Label from "../../GeneralComponents/Label";
import AddConstraintNameModal from "../AddConstraintNameModal";
import { useNavigate } from "react-router-dom";

const ConstraintsPanel = () => {
  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mapIdToList = {
    soft: softConstraints,
    hard: hardConstraints,
  };

  const addNewConstraint = () => {
    setIsModalOpen(true);
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
    <Container width={"50%"} flexDirection={"column"}>
      <AddConstraintNameModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Container
        justifyContent={"space-evenly"}
        style={{ marginBottom: "20px" }}
      >
        <GeneralButton
          onClick={() => {
            navigate("/show-solution");
          }}
        >
          Solve configuration
        </GeneralButton>
        <GeneralButton onClick={addNewConstraint}>Add constraint</GeneralButton>
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
