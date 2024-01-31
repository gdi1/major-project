import { constraintsActions } from "../../store/constraints";
import { useSelector, useDispatch } from "react-redux";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import AddConstraintNameModal from "./ConstraintModals/AddConstraintNameModal";
import EditConstraintModal from "./ConstraintModals/EditConstraintModal";
import styled from "styled-components";
import ConstraintsList from "./ConstraintsList";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import Title from "../../GeneralComponents/Title";
import borders from "../../style-utils/borders";
import DeleteConstraintModal from "./ConstraintModals/DeleteConstraintModal";

const constraints_types = ["hard", "soft"];

const ConstraintsPanel = ({ optionsTypes = constraints_types }) => {
  const { hardConstraints, softConstraints, outdatedConstraints, teams } =
    useSelector((state) => state.constraints);
  const dispatch = useDispatch();
  const [isNewConstraintModalOpen, setIsNewConstraintModalOpen] =
    useState(false);
  const [isEditConstraintModalOpen, setIsEditConstraintModalOpen] =
    useState(false);
  const [editInfo, setEditInfo] = useState({});

  const [constraintToDelete, setConstraintToDelete] = useState(undefined);
  const [showConstraintDeleteModal, setShowConstraintDeleteModal] =
    useState(false);

  useEffect(() => {
    if (constraintToDelete) setShowConstraintDeleteModal(true);
  }, [constraintToDelete]);

  useEffect(() => {
    if (!showConstraintDeleteModal) setConstraintToDelete(undefined);
  }, [showConstraintDeleteModal]);

  const mapIdToList = {
    soft: softConstraints,
    hard: hardConstraints,
  };

  const addNewConstraint = () => {
    if (teams.length === 0) {
      alert(
        "You must at least input some teams before creating a new constraint."
      );
      return;
    }
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
        isDrag: true,
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
    <HomePageConstraintsSection>
      <AddConstraintNameModal
        isModalOpen={isNewConstraintModalOpen}
        setIsModalOpen={setIsNewConstraintModalOpen}
        isSoft={optionsTypes.length === 1 && optionsTypes[0] === "soft"}
      />
      <EditConstraintModal
        isModalOpen={isEditConstraintModalOpen}
        setIsModalOpen={setIsEditConstraintModalOpen}
        editInfo={editInfo}
      />
      <DeleteConstraintModal
        isModalOpen={showConstraintDeleteModal}
        setIsModalOpen={setShowConstraintDeleteModal}
        constraintToDelete={constraintToDelete}
      />
      <ConstraintHeader>
        <Title>Constraints</Title>
        <GeneralButton onClick={addNewConstraint}>Add constraint</GeneralButton>
      </ConstraintHeader>
      <ConstraintsGroup>
        <DragDropContext onDragEnd={handleDragEnd}>
          {optionsTypes.includes("hard") && (
            <ConstraintListContainer>
              <RowContainer style={{ marginBottom: "20px" }}>
                <CenteredLabel>Hard</CenteredLabel>
              </RowContainer>
              <ConstraintsList
                type={"hard"}
                constraints={hardConstraints}
                setEditInfo={setEditInfo}
                setIsEditConstraintModalOpen={setIsEditConstraintModalOpen}
                setConstraintToDelete={setConstraintToDelete}
              />
            </ConstraintListContainer>
          )}
          {optionsTypes.includes("soft") && (
            <ConstraintListContainer>
              <RowContainer style={{ marginBottom: "20px" }}>
                <CenteredLabel>Soft</CenteredLabel>
              </RowContainer>
              <ConstraintsList
                type={"soft"}
                constraints={softConstraints}
                setEditInfo={setEditInfo}
                setIsEditConstraintModalOpen={setIsEditConstraintModalOpen}
              />
            </ConstraintListContainer>
          )}
        </DragDropContext>
      </ConstraintsGroup>
    </HomePageConstraintsSection>
  );
};

const ConstraintHeader = styled(RowContainer)`
  height: auto;
  border-bottom: ${borders.small};
  justify-content: space-between;
  margin-bottom: 40px;
`;

const ButtonGroup = styled(RowContainer)`
  justify-content: space-evenly;
  margin-bottom: 20px;
`;
const ConstraintsGroup = styled(RowContainer)`
  justify-content: space-evenly;
  align-items: start;
  height: auto;
  gap: 20px;
`;

const HomePageConstraintsSection = styled(ColumnContainer)`
  width: 80%;
  height: auto;
`;

const ConstraintListContainer = styled(ColumnContainer)`
  width: 40%;
  height: auto;
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
