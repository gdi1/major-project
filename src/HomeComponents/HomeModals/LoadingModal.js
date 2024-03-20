import Modal from "react-modal";
import { modal_content } from "../../style-utils/modalContent";
import {
  ModalBody,
  ModalButton,
  ModalTitle,
  ModalButtonGroup,
  CenteredModalLabel,
} from "../../GeneralComponents/ModalComponents";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import colors from "../../style-utils/colors";
import { spinning_animation } from "../../GeneralComponents/animations";

const LoadingModal = ({ isModalOpen, setIsModalOpen, solveConfiguration }) => {
  const modalRef = useRef();
  const [controller, setController] = useState(null);
  const [isError, setIsError] = useState(false);

  const closeModal = () => {
    if (controller) {
      controller.abort();
    }
    setController(null);
    setIsError(false);
    setIsModalOpen(false);
  };

  const generateNewSolution = async () => {
    const newController = new AbortController();
    const signal = newController.signal;
    setController(newController);
    if (!(await solveConfiguration(signal))) {
      setIsError(true);
      setController(null);
    }
  };

  useEffect(() => {
    if (isModalOpen) generateNewSolution();
  }, [isModalOpen]);

  return (
    <Modal
      ariaHideApp={false}
      ref={modalRef}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: { ...modal_content.content, width: "40%" },
        overlay: { ...modal_content.overlay },
      }}
    >
      <ModalBody>
        <ModalTitle>Generating solution</ModalTitle>
        {!isError && (
          <React.Fragment>
            <CenteredModalLabel>
              Waiting for solver to finish...
            </CenteredModalLabel>
            <CenteredModalLabel>
              This might take a few minutes.
            </CenteredModalLabel>
          </React.Fragment>
        )}
        {isError && (
          <CenteredModalLabel>
            An unexpected error has occurred when generating a solution.
          </CenteredModalLabel>
        )}
        {!isError && <LoadingSpinner />}
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

const LoadingSpinner = styled.div`
  height: 2vw;
  width: 2vw;

  border: 0.5vw solid ${colors.mustard};
  border-top: 0.5vw solid ${colors.brick};
  border-radius: 50%;

  animation: ${spinning_animation} 2s linear infinite;
`;

export default LoadingModal;
