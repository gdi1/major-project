import styled from "styled-components";
import text_styles from "../style-utils/text_styles";

export const Container = styled.div`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border: ${(props) => props.border || ""};
  gap: ${(props) => props.gap || "0"};
  padding: ${(props) => props.padding || "0"};
  overflow: ${(props) => props.overflow || ""};
  margin-left: ${(props) => props.marginLeft || "0"};
  margin-right: ${(props) => props.marginRight || "0"};
  background-color: ${(props) => (props.focused ? "blue" : "white")};
`;

const SimpleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ContainerRowCenter = styled.div`
  ${RowContainer};
  justify-content: center;
`;

export const ContainerRowSpcEv = styled.div`
  ${RowContainer};
  justify-content: space-evenly;
`;

export const ContainerRowSpcBtw = styled.div`
  ${RowContainer};
  justify-content: space-between;
`;

export const ContainerColCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ContainerColSpcEv = styled.div`
  ${ColumnContainer};
  align-items: space-evenly;
`;

export const ContainerColSpcBtw = styled.div`
  ${ColumnContainer};
  align-items: space-between;
`;
