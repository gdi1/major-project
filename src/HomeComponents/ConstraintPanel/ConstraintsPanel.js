import { configurationsActions } from "../../store/configurations";
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
import margins from "../../style-utils/margins";
import gaps from "../../style-utils/gaps";
import { IconContainer, LargeIcon } from "../../GeneralComponents/Icons";
import info_icon from "../../icons/info_icon.png";
import { TooltipText } from "../../GeneralComponents/TooltipText";
import ConstraintsInfoCardModal from "./ConstraintModals/ConstraintsInfoCardModal";
import exclamation_mark_icon from "../../icons/exclamation_mark_icon.png";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../Utilities/NotificationWrapper";

const constraints_types = ["hard", "soft"];
/**
 *
 * References
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/react-beautiful-dnd-nested-example-forked-3o0i1i?file=%2Fsrc%2FNestedListComponent.js.
 *
 * “Simplifying Drag and Drop (Lists and Nested Lists).” Tania Rascia RSS, n.d.
 * https://www.taniarascia.com/simplifying-drag-and-drop/.
 */
const ConstraintsPanel = ({ optionsTypes = constraints_types }) => {
  const { hardConstraints, softConstraints, outdatedConstraints, teams } =
    useSelector((state) => state.configurations);
  const dispatch = useDispatch();
  const [isInfoCardModalOpen, setIsInfoCardModalOpen] = useState(false);
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
      NotificationManager.error(
        ...formatNtf(
          "You must add at least one team before creating a new constraint.",
          "Error"
        )
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
      configurationsActions.removeConstraint({
        index: sourceIndex,
        type: sourceListId,
        isDrag: true,
      })
    );
    dispatch(
      configurationsActions.addConstraint({
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
      <ConstraintsInfoCardModal
        isModalOpen={isInfoCardModalOpen}
        setIsModalOpen={setIsInfoCardModalOpen}
      />
      <ConstraintHeader>
        <Title>
          Constraints
          <IconContainer style={{ marginLeft: `${margins.xsmall}` }}>
            <InfoIcon
              src={info_icon}
              onClick={() => setIsInfoCardModalOpen(true)}
            />
            <TooltipText>Info</TooltipText>
          </IconContainer>
          {outdatedConstraints.length > 0 && (
            <IconContainer style={{ marginLeft: `${margins.xsmall}` }}>
              <InfoIcon src={exclamation_mark_icon} />
              <TooltipText>
                Red highlighted constraints are inconsistent!
              </TooltipText>
            </IconContainer>
          )}
        </Title>
        <GeneralButton onClick={addNewConstraint}>Add constraint</GeneralButton>
      </ConstraintHeader>
      <ConstraintsGroup>
        <DragDropContext onDragEnd={handleDragEnd}>
          {optionsTypes.includes("hard") && (
            <ConstraintListContainer>
              <ConstraintListTitle>
                <CenteredLabel>Hard</CenteredLabel>
              </ConstraintListTitle>
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
              <ConstraintListTitle>
                <CenteredLabel>Soft</CenteredLabel>
              </ConstraintListTitle>
              <ConstraintsList
                type={"soft"}
                constraints={softConstraints}
                setEditInfo={setEditInfo}
                setIsEditConstraintModalOpen={setIsEditConstraintModalOpen}
                setConstraintToDelete={setConstraintToDelete}
              />
            </ConstraintListContainer>
          )}
        </DragDropContext>
      </ConstraintsGroup>
    </HomePageConstraintsSection>
  );
};

const ConstraintListTitle = styled(RowContainer)`
  margin-bottom: ${margins.small};
`;

const ConstraintHeader = styled(RowContainer)`
  height: auto;
  border-bottom: ${borders.small};
  justify-content: space-between;
  margin-bottom: ${margins.small};
`;

const ConstraintsGroup = styled(RowContainer)`
  justify-content: space-evenly;
  align-items: start;
  height: auto;
  gap: ${gaps.small};
`;

const HomePageConstraintsSection = styled(ColumnContainer)`
  width: 80vw;
  height: auto;
`;

const ConstraintListContainer = styled(ColumnContainer)`
  width: 40%;
  height: auto;
`;

const InfoIcon = styled(LargeIcon)`
  cursor: pointer;
`;
export default ConstraintsPanel;
