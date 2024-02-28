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
import { SmallIcon, LargeIcon } from "../GeneralComponents/Icons";
import { small_icon } from "../style-utils/icons";
import colors from "../style-utils/colors";
import text_styles from "../style-utils/text_styles";

const constraint_types = ["hard", "soft"];
const options_types = ["teams", "locations", "periods", "weeks"];

const SidebarComponent = ({
  show,
  setShow,
  setOptionsTypes,
  optionsTypes,
  setShowSaveWorkingCopyModal,
  setShowExportEverythingModal,
  setShowGeneralImportModal,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const selectedStyle = (type) => ({
    backgroundColor: optionsTypes.includes(type) ? `${colors.mustard}` : "",
  });

  const style_sidebar = {
    fontFamily: `${text_styles.styles.fontFamily}`,
  };
  //backgroundColor: `${colors.mustard}`,
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
    <Sidebar
      collapsed={collapsed}
      style={{
        height: "100%",
        width: "3vw",
      }}
    >
      <Menu>
        <MenuItem
          onClick={() => setCollapsed((prev) => !prev)}
          style={{ minHeight: "3vw", ...style_sidebar }}
        >
          {collapsed ? (
            <FiArrowRightCircle style={small_icon} />
          ) : (
            <FiArrowLeftCircle style={small_icon} />
          )}
        </MenuItem>
        <MenuItem style={{ minHeight: "3vw", ...style_sidebar }}>
          <MenuItemLabel onClick={() => setShowSaveWorkingCopyModal(true)}>
            <SmallIcon src={save_icon} />
            {collapsed ? "" : "Save working copy"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem style={{ minHeight: "3vw", ...style_sidebar }}>
          <MenuItemLabel onClick={() => setShowGeneralImportModal(true)}>
            <SmallIcon src={import_icon} />
            {collapsed ? "" : "Import"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem style={{ minHeight: "3vw", ...style_sidebar }}>
          <MenuItemLabel onClick={() => setShowExportEverythingModal(true)}>
            <SmallIcon src={export_icon} />
            {collapsed ? "" : "Export project"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShow("home");
            setOptionsTypes([]);
          }}
          style={{ minHeight: "3vw", ...style_sidebar }}
        >
          <MenuItemLabel>
            <SmallIcon src={home_icon} />
            {collapsed ? "" : "Home Page"}
          </MenuItemLabel>
        </MenuItem>
        {!collapsed && (
          <React.Fragment>
            <SubMenu
              label={"Configurations"}
              icon={<SmallIcon src={settings_icon} />}
              style={style_sidebar}
            >
              <SubMenu
                label="Options"
                style={style_sidebar}
                icon={<SmallIcon src={options_icon} />}
              >
                <MenuItem onClick={() => addNewType("all-options")}>
                  <ItemName>All</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("teams")}
                  style={selectedStyle("teams")}
                >
                  <ItemName>Teams</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("locations")}
                  style={selectedStyle("locations")}
                >
                  <ItemName>Locations</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("periods")}
                  style={selectedStyle("periods")}
                >
                  <ItemName>Periods</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("weeks")}
                  style={selectedStyle("weeks")}
                >
                  <ItemName>Weeks</ItemName>
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="Constraints"
                style={style_sidebar}
                icon={<SmallIcon src={history_icon} />}
              >
                <MenuItem onClick={() => addNewType("all-constraints")}>
                  <ItemName>All</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("hard")}
                  style={selectedStyle("hard")}
                >
                  <ItemName>Hard</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => addNewType("soft")}
                  style={selectedStyle("soft")}
                >
                  <ItemName>Soft</ItemName>
                </MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu
              label="Snapshots"
              icon={<SmallIcon src={snapshot_icon} />}
              style={style_sidebar}
            >
              <MenuItem
                onClick={() => setShow("snapshots")}
                style={style_sidebar}
              >
                <MenuItemLabel>
                  <SmallIcon src={history_icon} />
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

const MenuItemLabel = styled.div`
  display: flex;
  gap: 10px;
  font-family: ${text_styles.styles.fontFamily};
  font-size: ${text_styles.fonts.xsmall};
`;

const ItemName = styled.div`
  font-family: ${text_styles.styles.fontFamily};
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
