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
import styled, { keyframes } from "styled-components";
import colors from "../../style-utils/colors";

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
            An unexpected error has occurred when generation a solution.
          </CenteredModalLabel>
        )}
        {!isError && <Loader />}
        <ModalButtonGroup>
          <ModalButton onClick={closeModal}>Close</ModalButton>
        </ModalButtonGroup>
      </ModalBody>
    </Modal>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create the Loader component using styled-components
const Loader = styled.div`
  border: 0.5vw solid ${colors.mustard}; /* Light grey */
  border-top: 0.5vw solid ${colors.brick}; /* Blue */
  border-radius: 50%;
  width: 2vw;
  height: 2vw;
  animation: ${spin} 2s linear infinite;
`;

export default LoadingModal;
