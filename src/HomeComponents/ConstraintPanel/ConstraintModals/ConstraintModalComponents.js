import { Label } from "../../../GeneralComponents/Labels";
import Title from "../../../GeneralComponents/Title";
import {
  RowContainer,
  ColumnContainer,
} from "../../../GeneralComponents/Containers";
import borders from "../../../style-utils/borders";
import GeneralButton from "../../../GeneralComponents/GeneralButton";
import styled from "styled-components";
import InputField from "../../../GeneralComponents/InputField";

export const ModalLabel = styled(Label)`
  align-self: start;
`;

export const CenteredModalLabel = styled(Label)`
  align-self: start;
  text-align: center;
`;

export const ModalTitle = styled(Title)`
  border-bottom: ${borders.small};
`;

export const NameInputField = styled(InputField)`
  width: 100%;
  height: 40px;
  font-size: 20px;
`;

export const ModalButtonGroup = styled(RowContainer)`
  justify-content: space-evenly;
`;

export const ModalButton = styled(GeneralButton)`
  width: 45%;
`;

export const ModalBody = styled(ColumnContainer)`
  gap: 10px;
`;
