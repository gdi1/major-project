import styled from "styled-components";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import { Label } from "../../GeneralComponents/Labels";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";
import { useSelector } from "react-redux";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import React, { useState } from "react";
import Title from "../../GeneralComponents/Title";
import DropDownItem from "./DropDownItem";
import DynamicInputField from "./DynamicInputFieldComponents/DynamicInputField";
import NoOfWeeksOptions from "./NoOfWeeksOptions";
import margins from "../../style-utils/margins";
import gaps from "../../style-utils/gaps";
import colors from "../../style-utils/colors";
import { fadeIn } from "../../GeneralComponents/animations";

const types = ["teams", "locations", "periods", "weeks"];
const titles = {
  teams: "Teams",
  locations: "Locations",
  periods: "Periods",
  weeks: "Weeks",
};

const SetupOptionsPanel = ({ optionsTypes = types }) => {
  const options = useSelector((state) => state.configurations);
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
      {optionsTypes.map((type) => (
        <OptionSection>
          <OptionHeader>
            <OptionLabel>{titles[type]}</OptionLabel>
            <GeneralButton onClick={() => toggleShowTypes(type)}>
              {showTypes.includes(type) ? "Close" : "Show"}
            </GeneralButton>
          </OptionHeader>
          {showTypes.includes(type) && type !== "weeks" && (
            <Options>
              <DynamicInputField type={type} />
              <OptionsGridContainer>
                {options[type].map((option, idx) => (
                  <DropDownItem
                    key={option.value}
                    id={idx}
                    option={option}
                    type={type}
                  />
                ))}
              </OptionsGridContainer>
            </Options>
          )}
          {showTypes.includes(type) && type === "weeks" && <NoOfWeeksOptions />}
        </OptionSection>
      ))}
    </SetupOptionsBody>
  );
};

const SectionHeader = styled(RowContainer)`
  height: auto;
  border-bottom: ${borders.small};
  margin-bottom: ${margins.xsmall};
  justify-content: start;
`;

const SetupOptionsBody = styled(ColumnContainer)`
  height: auto;
  width: 80vw;
`;

const OptionHeader = styled(RowContainer)`
  padding: ${paddings.small};
  border-bottom: ${borders.small};
  margin-bottom: ${margins.xsmall};
`;

const OptionLabel = styled(Label)``;

const Options = styled(ColumnContainer)`
  align-items: start;
  justify-content: start;
  gap: ${gaps.small};
`;

export const OptionsGridContainer = styled.div`
  display: grid;
  animation: ${fadeIn} 0.3s ease-in-out;
  grid-template-columns: repeat(auto-fit, 16vw);
  background-color: ${colors.beige};
  row-gap: ${gaps.lrg};
  column-gap: ${gaps.med};
  box-sizing: border-box;
  justify-content: start;
  margin-bottom: ${margins.med};
  width: 100%;
`;

const OptionSection = styled(ColumnContainer)`
  height: auto;
  width: 90%;
`;

export default SetupOptionsPanel;
