import { Label } from "./Labels";
import Title from "./Title";
import { RowContainer, ColumnContainer } from "./Containers";
import borders from "../style-utils/borders";
import GeneralButton from "./GeneralButton";
import styled from "styled-components";
import InputField from "./InputField";
import text_styles from "../style-utils/text_styles";
import gaps from "../style-utils/gaps";
import { TextWithWordBreakCSS } from "./TextWithoutOverflow";

export const ModalLabel = styled(Label)`
  align-self: start;
  ${TextWithWordBreakCSS};
`;

export const CenteredModalLabel = styled(Label)`
  align-self: start;
  text-align: center;
  ${TextWithWordBreakCSS};
`;

export const ModalTitle = styled(Title)`
  border-bottom: ${borders.small};
  ${TextWithWordBreakCSS};
`;

export const NameInputField = styled(InputField)`
  width: 100%;
  height: 2.5vw;
  font-size: ${text_styles.fonts.small};
`;

export const ModalButtonGroup = styled(RowContainer)`
  justify-content: space-evenly;
`;

export const ModalButton = styled(GeneralButton)`
  width: 45%;
`;

export const ModalBody = styled(ColumnContainer)`
  gap: ${gaps.small};
`;
