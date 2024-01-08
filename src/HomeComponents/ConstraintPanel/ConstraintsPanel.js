import { constraintsActions } from "../../store/constraints";
import { useSelector, useDispatch } from "react-redux";
import {
  ColumnContainer,
  Container,
  RowContainer,
} from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import AddConstraintNameModal from "../AddConstraintNameModal";
import { useNavigate } from "react-router-dom";
import EditConstraintModal from "../EditConstraintModal";
import styled from "styled-components";
import ConstraintsList from "./ConstraintsList";

const ConstraintsPanel = () => {
  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNewConstraintModalOpen, setIsNewConstraintModalOpen] =
    useState(false);
  const [isEditConstraintModalOpen, setIsEditConstraintModalOpen] =
    useState(false);
  const [editInfo, setEditInfo] = useState({});

  const mapIdToList = {
    soft: softConstraints,
    hard: hardConstraints,
  };

  const addNewConstraint = () => {
    setIsNewConstraintModalOpen(true);
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

  // const openConstraintInEditMode = (index, type) => {
  //   dispatch(
  //     currentConstraintActions.setCurrentConstraint(mapIdToList[type][index])
  //   );
  // };

  return (
    <HomePageConstraintsSection>
      <AddConstraintNameModal
        isModalOpen={isNewConstraintModalOpen}
        setIsModalOpen={setIsNewConstraintModalOpen}
      />
      <EditConstraintModal
        isModalOpen={isEditConstraintModalOpen}
        setIsModalOpen={setIsEditConstraintModalOpen}
        editInfo={editInfo}
      />
      <ButtonGroup>
        <GeneralButton
          onClick={() => {
            dispatch(constraintsActions.createValueToOptionMappings());
            navigate("/show-solution");
          }}
        >
          Solve configuration
        </GeneralButton>
        <GeneralButton onClick={addNewConstraint}>Add constraint</GeneralButton>
      </ButtonGroup>
      <ConstraintsGroup>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ConstraintsList
            type={"hard"}
            constraints={hardConstraints}
            setEditInfo={setEditInfo}
            setIsEditConstraintModalOpen={setIsEditConstraintModalOpen}
          />
          <ConstraintsList
            type={"soft"}
            constraints={softConstraints}
            setEditInfo={setEditInfo}
            setIsEditConstraintModalOpen={setIsEditConstraintModalOpen}
          />
        </DragDropContext>
      </ConstraintsGroup>
    </HomePageConstraintsSection>
  );
};

const ButtonGroup = styled(RowContainer)`
  justify-content: space-evenly;
  margin-bottom: 20px;
`;
const ConstraintsGroup = styled(ColumnContainer)`
  justify-content: space-evenly;
  gap: 10px;
`;

const HomePageConstraintsSection = styled(ColumnContainer)`
  width: 50%;
`;
export default ConstraintsPanel;

// {
/* <Drop id="hard" style={{ width: "50%" }}>
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
                    <Constraint
                      onClick={() => {
                        setEditInfo({
                          index,
                          type: "hard",
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
                    <Constraint
                      onClick={() => {
                        setEditInfo({
                          index,
                          type: "soft",
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
          </Drop> */
// }
