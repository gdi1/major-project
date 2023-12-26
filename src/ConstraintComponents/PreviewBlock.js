import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Block, { CloseButton } from "./Block";
import { currentConstraintActions } from "../store/currentConstraint";
import { useState } from "react";

const blockNames = {
  teams: "Team(s) ",
  locations: "Location ",
  weeks: "Week(s)",
  periods: "Period(s)",
  and: "AND",
  or: "OR",
  "at-least": ["At least", "times"],
  "at-most": ["At most", "times"],
  play: "Play",
  "not-play": "Not Play",
  "play-against": "Play Against",
  "not-play-against": "Not Play Against",
};

const PreviewBlock = ({ block, x, y }) => {
  const global_state = useSelector((state) => state.constraints);
  const { focusedConstraint } = useSelector((state) => state.currentConstraint);

  const dispatch = useDispatch();

  const handleChange = (selectedOptions) => {
    dispatch(currentConstraintActions.updateOptions({ selectedOptions, x, y }));
  };

  const removeConstraintBlock = (e) => {
    if (focusedConstraint !== x) return;
    dispatch(currentConstraintActions.removeConstraintBlock({ x, y }));
  };
  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  // const [showCloseButton, setShowCloseButton] = useState(false);

  const getContentBlock = () => {
    const { type } = block;
    const multiselect_types = ["locations", "weeks", "periods", "teams"];
    if (multiselect_types.includes(type)) {
      return (
        <React.Fragment>
          {blockNames[type]}
          <div
            style={{ width: "60%" }}
            onClick={(e) => {
              if (focusedConstraint === x) e.stopPropagation();
            }}
          >
            <MultiSelect
              options={global_state[type]}
              value={block.options}
              onChange={handleChange}
              labelledBy="Select"
            />
          </div>
        </React.Fragment>
      );
    } else if (type === "at-least" || type === "at-most") {
      return (
        <React.Fragment>
          {blockNames[type][0]}
          <div
            onClick={(e) => {
              if (focusedConstraint === x) e.stopPropagation();
            }}
            style={{ pointerEvents: "none" }}
          >
            <Select
              options={options}
              value={block.times}
              onChange={handleChange}
            />
          </div>
          {blockNames[type][1]}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>{blockNames[type]}</React.Fragment>;
    }
  };

  return (
    <Block isSelection={false} onClick={removeConstraintBlock}>
      {getContentBlock()}
      {/* {showCloseButton && <CloseButton className="close-btn"></CloseButton>} */}
    </Block>
  );
};

export default PreviewBlock;
