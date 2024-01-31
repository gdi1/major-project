import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import options_icon from "./../icons/options_icon.png";
import settings_icon from "./../icons/settings_icon.png";
import snapshot_icon from "./../icons/snapshot_icon.png";
import history_icon from "./../icons/history_icon.png";
import home_icon from "./../icons/home_icon.png";
import go_back_icon from "./../icons/go_back_icon.png";
import save_icon from "./../icons/save_icon.png";
import import_icon from "./../icons/import_icon.png";
import export_icon from "./../icons/export_icon.png";
import styled from "styled-components";
import React from "react";

const constraint_types = ["hard", "soft"];
const options_types = ["teams", "locations", "periods", "weeks"];

const SidebarComponent = ({
  show,
  setShow,
  setOptionsTypes,
  optionsTypes,
  setShowSaveWorkingCopyModal,
  setShowExportEverythingModal,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const selectedStyle = (type) => ({
    backgroundColor: optionsTypes.includes(type) ? "blue" : "",
  });

  const addNewType = (type) => {
    if (type === "all-constraints") {
      setShow("constraints");
      setOptionsTypes(constraint_types);
      return;
    }
    if (type === "all-options") {
      setShow("options");
      setOptionsTypes(options_types);
      return;
    }
    if (constraint_types.includes(type)) {
      if (show === "constraints") {
        if (optionsTypes.includes(type))
          setOptionsTypes((prev) => prev.filter((el) => el !== type));
        else setOptionsTypes((prev) => [...prev, type]);
      } else {
        setShow("constraints");
        setOptionsTypes([type]);
      }
    }
    if (options_types.includes(type)) {
      if (show === "options") {
        if (optionsTypes.includes(type))
          setOptionsTypes((prev) => prev.filter((el) => el !== type));
        else setOptionsTypes((prev) => [...prev, type]);
      } else {
        setShow("options");
        setOptionsTypes([type]);
      }
    }
  };

  return (
    <Sidebar collapsed={collapsed} style={{ height: "100%" }}>
      <Menu>
        <MenuItem onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? (
            <FiArrowRightCircle style={{ height: "20px", width: "20px" }} />
          ) : (
            <FiArrowLeftCircle style={{ height: "20px", width: "20px" }} />
          )}
        </MenuItem>
        <MenuItem>
          <MenuItemLabel onClick={() => setShowSaveWorkingCopyModal(true)}>
            <Icon src={save_icon} />
            {collapsed ? "" : "Save working copy"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>
            <Icon src={import_icon} />
            {collapsed ? "" : "General Import"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel onClick={() => setShowExportEverythingModal(true)}>
            <Icon src={export_icon} />
            {collapsed ? "" : "Export everything"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShow("home");
            setOptionsTypes([]);
          }}
        >
          <MenuItemLabel>
            <Icon src={home_icon} />
            {collapsed ? "" : "Home Page"}
          </MenuItemLabel>
        </MenuItem>
        {!collapsed && (
          <React.Fragment>
            <SubMenu
              label={"General Settings"}
              icon={<Icon src={settings_icon} />}
            >
              <SubMenu label="Options" icon={<Icon src={options_icon} />}>
                <MenuItem onClick={() => addNewType("all-options")}>
                  All
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("teams")}
                  style={selectedStyle("teams")}
                >
                  Teams
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("locations")}
                  style={selectedStyle("locations")}
                >
                  Locations
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("periods")}
                  style={selectedStyle("periods")}
                >
                  Periods
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("weeks")}
                  style={selectedStyle("weeks")}
                >
                  Weeks
                </MenuItem>
              </SubMenu>
              <SubMenu label="Constraints" icon={<Icon src={history_icon} />}>
                <MenuItem onClick={() => addNewType("all-constraints")}>
                  All
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("hard")}
                  style={selectedStyle("hard")}
                >
                  Hard
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("soft")}
                  style={selectedStyle("soft")}
                >
                  Soft
                </MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu
              label={"Snapshots Settings"}
              icon={<Icon src={snapshot_icon} />}
            >
              <MenuItem onClick={() => setShow("snapshots")}>
                <MenuItemLabel>
                  <Icon src={history_icon} />
                  History
                </MenuItemLabel>
              </MenuItem>
            </SubMenu>
          </React.Fragment>
        )}
      </Menu>
    </Sidebar>
  );
};

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const MenuItemLabel = styled.div`
  display: flex;
  gap: 10px;
`;

export default SidebarComponent;

// {
//   /* <MenuItem onClick={() => setShow("options")}>
//                 <MenuItemLabel>
//                   <Icon src={options_icon} />
//                   Options
//                 </MenuItemLabel>
//               </MenuItem>
//               <MenuItem onClick={() => setShow("constraints")}>
//                 <MenuItemLabel>
//                   <Icon src={history_icon} />
//                   Constraints
//                 </MenuItemLabel>
//               </MenuItem> */
// }
