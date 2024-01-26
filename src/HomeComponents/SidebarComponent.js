import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import options_icon from "./../icons/options_icon.png";
import settings_icon from "./../icons/settings_icon.png";
import snapshot_icon from "./../icons/snapshot_icon.png";
import history_icon from "./../icons/history_icon.png";
import working_copy_icon from "./../icons/working_copy_icon.png";
import home_icon from "./../icons/home_icon.png";
import go_back_icon from "./../icons/go_back_icon.png";
import styled from "styled-components";
import React from "react";

const SidebarComponent = ({ setShow }) => {
  const [collapsed, setCollapsed] = useState(true);
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
        <MenuItem onClick={() => setShow("home")}>
          <MenuItemLabel>
            <Icon src={home_icon} />
            {collapsed ? "" : "Home Page"}
          </MenuItemLabel>
        </MenuItem>
        {!collapsed && (
          <React.Fragment>
            <SubMenu
              label={collapsed ? "" : "Setup Settings"}
              icon={<Icon src={settings_icon} />}
            >
              <MenuItem onClick={() => setShow("options")}>
                <MenuItemLabel>
                  <Icon src={options_icon} />
                  Options
                </MenuItemLabel>
              </MenuItem>
              <MenuItem onClick={() => setShow("constraints")}>
                <MenuItemLabel>
                  <Icon src={history_icon} />
                  Constraints
                </MenuItemLabel>
              </MenuItem>
            </SubMenu>
            <SubMenu
              label={collapsed ? "" : "Snapshots Settings"}
              icon={<Icon src={snapshot_icon} />}
            >
              <MenuItem onClick={() => setShow("history")}>
                <MenuItemLabel>
                  <Icon src={history_icon} />
                  History
                </MenuItemLabel>
              </MenuItem>
              <MenuItem>
                <MenuItemLabel>
                  <Icon src={go_back_icon} />
                  Go to Working Copy
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
