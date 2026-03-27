import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import { menuItems } from "@MECommonComponents/sidebar/sidebarMenu";
import { sidebarHeader, sidebarMenuTitle } from "@MELocalization/en";
import {
  Sidebar,
  SidebarMenu,
  SidebarInset,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@MEShadcnComponents/sidebar";

import logo from "@MEAssets/logo.png";

const MESidebar = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const onSidebarMenuItemClick = (index, path) => {
    setActiveMenuIndex(index);
    navigate(path);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold">
              {_.startCase(t("sidebarHeader", { defaultValue: sidebarHeader }))}
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {_.startCase(
                t("sidebarMenuTitle", { defaultValue: sidebarMenuTitle }),
              )}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item, index) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      className={`${activeMenuIndex === index ? "bg-primary text-secondary hover:bg-primary hover:text-secondary" : "hover:bg-secondary hover:text-primary"} hover:cursor-pointer`}
                      onClick={() => onSidebarMenuItemClick(index, item.path)}
                    >
                      <item.icon />
                      <span>{_.upperFirst(item.title)}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MESidebar;
