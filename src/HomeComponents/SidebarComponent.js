import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState, useEffect } from "react";
// import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import options_icon from "./../icons/options_icon.png";
import settings_icon from "./../icons/settings_icon.png";
import snapshot_icon from "./../icons/snapshot_icon.png";
import history_icon from "./../icons/history_icon.png";
import home_icon from "./../icons/home_icon.png";
import save_icon from "./../icons/save_icon.png";
import import_icon from "./../icons/import_icon.png";
import export_icon from "./../icons/export_icon.png";
import blocks_icon from "./../icons/blocks_icon.png";
import right_arrow from "./../icons/right_arrow.png";
import left_arrow from "./../icons/left_arrow.png";
import styled from "styled-components";
import React from "react";
import { SmallIcon } from "../GeneralComponents/Icons";
import { small_icon } from "../style-utils/icons";
import colors from "../style-utils/colors";
import text_styles from "../style-utils/text_styles";
import gaps from "../style-utils/gaps";
import margins from "../style-utils/margins";

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

  useEffect(() => {
    if (!collapsed) {
      const mIcons = document.querySelectorAll(".ps-menu-icon");
      mIcons.forEach((ic) => {
        ic.style.marginRight = `${margins.xsmall}`;
        ic.style.width = "1vw";
        ic.style.height = "1vw";
        ic.style.minWidth = "1vw";
      });
    }
  }, [collapsed]);

  const selectedStyle = (type) => ({
    ...style_sidebar,
    paddingLeft: "4vw",
    backgroundColor: optionsTypes.includes(type) ? `${colors.mustard}` : "",
  });

  const style_sidebar = {
    fontFamily: `${text_styles.styles.fontFamily}`,
    fontSize: `${text_styles.fonts.xsmall}`,
    padding: "1vh 1vw",
    boxSizing: "border-box",
    height: "auto",
    minHeight: "5vh",
  };

  const addNewType = (type) => {
    setShow((prev) => prev.filter((el) => el !== "home"));
    if (type === "all-constraints") {
      if (
        !show.includes("constraints") ||
        !constraint_types.every((op) => optionsTypes.includes(op))
      ) {
        setShow((prev) => [...new Set([...prev, "constraints"])]);
        setOptionsTypes((prev) => [...new Set([...prev, ...constraint_types])]);
      } else {
        setShow((prev) => {
          const result = prev.filter((el) => el !== "constraints");
          return result.length !== 0 ? result : ["home"];
        });
        setOptionsTypes((prev) =>
          prev.filter((el) => !constraint_types.includes(el))
        );
      }
      return;
    }
    if (type === "all-options") {
      if (
        !show.includes("options") ||
        !options_types.every((op) => optionsTypes.includes(op))
      ) {
        setShow((prev) => [...new Set([...prev, "options"])]);
        setOptionsTypes((prev) => [...new Set([...prev, ...options_types])]);
      } else {
        setShow((prev) => {
          const result = prev.filter((el) => el !== "options");
          return result.length !== 0 ? result : ["home"];
        });
        setOptionsTypes((prev) =>
          prev.filter((el) => !options_types.includes(el))
        );
      }
      return;
    }
    if (type === "all-snapshots") {
      if (!show.includes("snapshots")) {
        setShow((prev) => [...prev, "snapshots"]);
        setOptionsTypes((prev) => [...prev, "snapshots"]);
      } else {
        setShow((prev) => {
          const result = prev.filter((el) => el !== "snapshots");
          return result.length !== 0 ? result : ["home"];
        });
        setOptionsTypes((prev) => prev.filter((el) => el !== "snapshots"));
      }
      return;
    }
    if (constraint_types.includes(type)) {
      if (show.includes("constraints")) {
        if (optionsTypes.includes(type)) {
          setOptionsTypes((prev) => {
            const result = prev.filter((el) => el !== type);
            if (!result.some((op) => constraint_types.includes(op)))
              setShow((prev) => {
                const res = prev.filter((el) => el !== "constraints");
                return res.length !== 0 ? res : ["home"];
              });
            return result;
          });
        } else setOptionsTypes((prev) => [...prev, type]);
      } else {
        setShow((prev) => [...new Set([...prev, "constraints"])]);
        setOptionsTypes((prev) => [...new Set([...prev, type])]);
      }
    }
    if (options_types.includes(type)) {
      if (show.includes("options")) {
        if (optionsTypes.includes(type)) {
          setOptionsTypes((prev) => {
            const result = prev.filter((el) => el !== type);
            if (!result.some((op) => options_types.includes(op)))
              setShow((prev) => {
                const res = prev.filter((el) => el !== "options");
                return res.length !== 0 ? res : ["home"];
              });
            return result;
          });
        } else setOptionsTypes((prev) => [...prev, type]);
      } else {
        setShow((prev) => [...new Set([...prev, "options"])]);
        setOptionsTypes((prev) => [...new Set([...prev, type])]);
      }
    }
  };

  return (
    <Sidebar
      collapsed={collapsed}
      width="auto"
      transitionDuration={300}
      collapsedWidth="4vw"
      rootStyles={{
        height: "100vh",
      }}
    >
      <Menu>
        <MenuItem style={style_sidebar}>
          <MenuItemLabel
            collapsed={collapsed}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <SmallIcon src={right_arrow} />
            ) : (
              <SmallIcon src={left_arrow} />
            )}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem style={style_sidebar}>
          <MenuItemLabel onClick={() => setShowSaveWorkingCopyModal(true)}>
            <SmallIcon src={save_icon} />
            {collapsed ? "" : "Save working copy"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem style={style_sidebar}>
          <MenuItemLabel onClick={() => setShowGeneralImportModal(true)}>
            <SmallIcon src={import_icon} />
            {collapsed ? "" : "Import"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem style={style_sidebar}>
          <MenuItemLabel onClick={() => setShowExportEverythingModal(true)}>
            <SmallIcon src={export_icon} />
            {collapsed ? "" : "Export project"}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setShow(["home"]);
            setOptionsTypes([]);
          }}
          style={style_sidebar}
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
              style={{ ...style_sidebar, paddingLeft: "2vw" }}
            >
              <SubMenu
                label="Options"
                style={{ ...style_sidebar, paddingLeft: "3vw" }}
                icon={<SmallIcon src={options_icon} />}
              >
                <MenuItem
                  style={{
                    ...style_sidebar,
                    paddingLeft: "4vw",
                  }}
                  onClick={() => addNewType("all-options")}
                >
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
                style={{ ...style_sidebar, paddingLeft: "3vw" }}
                icon={
                  <SmallIcon src={blocks_icon} style={{ marginRight: 0 }} />
                }
              >
                <MenuItem
                  style={{
                    ...style_sidebar,
                    paddingLeft: "4vw",
                  }}
                  onClick={() => addNewType("all-constraints")}
                >
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
              style={{ ...style_sidebar, paddingLeft: "2vw" }}
            >
              <MenuItem
                onClick={() => {
                  addNewType("all-snapshots");
                }}
                style={selectedStyle("snapshots")}
              >
                <MenuItemLabel>
                  <SmallIcon src={history_icon} />
                  <ItemName>History</ItemName>
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
  height: auto;
  gap: ${gaps.xsmall};
  font-family: ${text_styles.styles.fontFamily};
  font-size: ${text_styles.fonts.xsmall};
`;

const ItemName = styled.div`
  font-family: ${text_styles.styles.fontFamily};
  font-size: ${text_styles.fonts.xsmall};
`;

export default SidebarComponent;

//  {/* {collapsed ? (
//               <FiArrowRightCircle style={small_icon} />
//             ) : (
//               <FiArrowLeftCircle style={small_icon} />
//             )} */}
