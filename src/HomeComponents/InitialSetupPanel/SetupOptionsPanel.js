import styled, { keyframes } from "styled-components";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import { Label } from "../../GeneralComponents/Labels";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";
import { useSelector, useDispatch } from "react-redux";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { useState, useRef } from "react";
import Title from "../../GeneralComponents/Title";
import DropDownItem from "./DropDownItem";

import DynamicInputField from "./DynamicInputFieldComponents/DynamicInputField";

const types = ["teams", "locations", "periods", "weeks"];
const titles = {
  teams: "Teams",
  locations: "Locations",
  periods: "Periods",
  weeks: "Weeks",
};

const SetupOptionsPanel = () => {
  const options = useSelector((state) => state.constraints);
  const [showTypes, setShowTypes] = useState([]);

  const toggleShowTypes = (type) => {
    setShowTypes((prev) =>
      prev.includes(type) ? prev.filter((ty) => ty !== type) : [...prev, type]
    );
  };

  return (
    <SetupOptionsBody>
      <SectionHeader>
        <Title>Options</Title>
      </SectionHeader>
      {types.map((type) => (
        <OptionSection>
          <OptionHeader>
            <OptionLabel>{titles[type]}</OptionLabel>
            <GeneralButton onClick={() => toggleShowTypes(type)}>
              Show
            </GeneralButton>
          </OptionHeader>
          {showTypes.includes(type) && (
            <OptionsGridContainer>
              <DynamicInputField type={type} />
              {options[type].map((option, idx) => (
                <DropDownItem key={idx} id={idx} option={option} type={type} />
              ))}
            </OptionsGridContainer>
          )}
        </OptionSection>
      ))}
    </SetupOptionsBody>
  );
};

const SectionHeader = styled(RowContainer)`
  height: auto;
  border-bottom: ${borders.small};
  margin-bottom: 40px;
  justify-content: start;
`;

const SetupOptionsBody = styled(ColumnContainer)`
  height: auto;
  width: 80%;
`;

const OptionHeader = styled(RowContainer)`
  padding: ${paddings.small};
  border-bottom: ${borders.small};
  margin-bottom: 20px;
`;

const OptionLabel = styled(Label)``;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const OptionsGridContainer = styled.div`
  display: grid;
  animation: ${fadeIn} 0.3s ease-in-out;
  grid-template-columns: repeat(auto-fit, 250px);
  width: 100%;
  row-gap: 40px;
  background-color: #fff;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const OptionSection = styled(ColumnContainer)`
  height: auto;
  width: 90%;
`;

export default SetupOptionsPanel;
