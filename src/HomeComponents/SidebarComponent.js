import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState, useEffect } from "react";
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
import colors from "../style-utils/colors";
import text_styles from "../style-utils/text_styles";
import gaps from "../style-utils/gaps";
import margins from "../style-utils/margins";
import { sidebarActions } from "../store/sidebar";
import { useDispatch } from "react-redux";

/**
 * References
 *
 * Codesandbox.io, n.d.,
 * https://codesandbox.io/p/sandbox/create-a-sidebar-menu-in-reactjs-dpdb1?file=%2Fsrc%2FComponents%2FHeader%2FHeader.js.
 *
 * “Create a Sidebar Menu in React JS,” Medium, n.d.,
 * https://medium.com/how-to-react/create-a-sidebar-menu-in-react-js-3463b306ca9a.
 *
 * “Create Responsive Sidebars with React-pro-Sidebar and Mui,” LogRocket Blog, n.d.,
 * https://blog.logrocket.com/creating-responsive-sidebar-react-pro-sidebar-mui/.
 *
 * “React-pro-Sidebar,” npm, n.d.,
 * https://www.npmjs.com/package/react-pro-sidebar.
 */
const SidebarComponent = ({
  optionsTypes,
  setShowSaveWorkingCopyModal,
  setShowExportEverythingModal,
  setShowGeneralImportModal,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!collapsed) {
      const mIcons = document.querySelectorAll(".ps-menu-icon");
      mIcons.forEach((ic) => {
        ic.style.width = "1vw";
        ic.style.minWidth = "1vw";
        ic.style.height = "1vw";
        ic.style.marginRight = `${margins.xsmall}`;
      });
    }
  }, [collapsed]);

  const style_sidebar = {
    fontFamily: `${text_styles.styles.fontFamily}`,
    fontSize: `${text_styles.fonts.xsmall}`,
    padding: "1vh 1vw",
    boxSizing: "border-box",
    height: "auto",
    minHeight: "5vh",
  };

  const selectedStyle = (type) => ({
    ...style_sidebar,
    paddingLeft: "4vw",
    backgroundColor: optionsTypes.includes(type) ? `${colors.mustard}` : "",
  });

  const toggleNewType = (type) => {
    dispatch(sidebarActions.toggleNewType(type));
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
            dispatch(sidebarActions.resetView());
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
                  onClick={() => toggleNewType("all-options")}
                >
                  <ItemName>All</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => toggleNewType("teams")}
                  style={selectedStyle("teams")}
                >
                  <ItemName>Teams</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => toggleNewType("locations")}
                  style={selectedStyle("locations")}
                >
                  <ItemName>Locations</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => toggleNewType("periods")}
                  style={selectedStyle("periods")}
                >
                  <ItemName>Periods</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => toggleNewType("weeks")}
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
                  onClick={() => toggleNewType("all-constraints")}
                >
                  <ItemName>All</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => toggleNewType("hard")}
                  style={selectedStyle("hard")}
                >
                  <ItemName>Hard</ItemName>
                </MenuItem>
                <MenuItem
                  onClick={() => toggleNewType("soft")}
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
                  toggleNewType("all-snapshots");
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
