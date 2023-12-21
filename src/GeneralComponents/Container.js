import styled from "styled-components";

const Container = styled.div`
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
export default Container;
