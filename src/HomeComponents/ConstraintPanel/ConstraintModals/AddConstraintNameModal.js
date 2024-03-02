import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Modal from "react-modal";
import { modal_content } from "../../../style-utils/modalContent";
import {
  ModalBody,
  ModalButton,
  ModalLabel,
  ModalTitle,
  ModalButtonGroup,
  NameInputField,
} from "../../../GeneralComponents/ModalComponents";
import { constraintFlowActions } from "../../../store/constraintFlow";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../../Utilities/NotificationWrapper";

const AddConstraintNameModal = ({
  isModalOpen,
  setIsModalOpen,
  newConstraint = undefined,
  isSoft = false,
}) => {
  const { teams, periods, weeks, locations } = useSelector(
    (state) => state.constraints
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hardConstraints, softConstraints } = useSelector(
    (state) => state.constraints
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef();
  const newConstraintNameRef = useRef();

  const goToNewConstraintCreation = () => {
    const name = newConstraintNameRef.current.value.trim();
    if (!name) {
      NotificationManager.error(
        ...formatNtf("Constraint must have a name to continue!", "Error")
      );
      return;
    }
    const isAlready =
      hardConstraints.some((c) => c.name === name) ||
      softConstraints.some((c) => c.name === name);
    if (isAlready) {
      NotificationManager.error(...formatNtf("Name already exists!", "Error"));
      return;
    }
    dispatch(constraintFlowActions.setName(name));
    if (isSoft) dispatch(constraintFlowActions.setType("soft"));
    if (newConstraint)
      dispatch(
        constraintFlowActions.setNewConstraint(
          makeConstraintUpToDate(newConstraint)
        )
      );
    navigate("/new-constraint");
  };

  const makeConstraintUpToDate = (newConstraint) => {
    const { game, period, week } = newConstraint;
    const { teamA, teamB, location } = game;
    const teamACurrent = teams.find(
      (team) => team.value === teamA.value && team.label === teamA.label
    );
    const teamBCurrent = teams.find(
      (team) => team.value === teamB.value && team.label === teamB.label
    );
    const periodCurrent = periods.find(
      (p) => p.value === period.value && p.label === period.label
    );
    const weekCurrent = weeks.find(
      (w) => w.value === week.value && w.label === week.label
    );
    const locationCurrent = locations.find(
      (l) =>
        l.coordinates[0] === location.coordinates[0] &&
        l.coordinates[1] === location.coordinates[1]
    );

    return {
      game: {
        teamA: teamACurrent || undefined,
        teamB: teamBCurrent || undefined,
        location: locationCurrent || undefined,
      },
      period: periodCurrent || undefined,
      week: weekCurrent || undefined,
    };
  };

  return (
    <Modal
      ariaHideApp={false}
      ref={modalRef}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={modal_content}
      onAfterOpen={() => newConstraintNameRef.current.focus()}
    >
      <ModalBody>
        <ModalTitle>Add Constraint</ModalTitle>
        <ModalLabel>Name</ModalLabel>
        <NameInputField placeholder="Enter name" ref={newConstraintNameRef} />
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
          <ModalButton onClick={goToNewConstraintCreation}>
            Continue
          </ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

export default AddConstraintNameModal;

// dispatch(currentConstraintActions.setNewConstraintName(name));
// dispatch(currentConstraintActions.setNewConstraint(newConstraint));
