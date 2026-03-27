import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogOutIcon, LucideMessageCircleWarning } from "lucide-react";

import _ from "lodash";

import { menuItems } from "@MECommonComponents/sidebar/sidebarMenu";
import { signOut } from "@MERedux/authentication/authenticationSlice";
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
  SidebarFooter,
} from "@MEShadcnComponents/sidebar";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogMedia,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@MEShadcnComponents/alert-dialog";
import {
  sidebarHeader,
  sidebarMenuTitle,
  sidebarSignoutTitle,
  sidebarSignoutMenuLabel,
  sidebarSignoutDescription,
} from "@MELocalization/en";

import logo from "@MEAssets/logo.png";

const MESidebarComponent = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const onSidebarMenuItemClick = (index, path) => {
    setActiveMenuIndex(index);
    navigate(path);
  };

  const handleSignout = () => {
    dispatch(signOut());
    setShowSignout(false);
    navigate("/");
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
        <SidebarFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={
                      "hover:bg-secondary hover:text-primary hover:cursor-pointer"
                    }
                    onClick={() => setShowSignout(true)}
                  >
                    <LogOutIcon />
                    <span>
                      {_.upperFirst(
                        t("sidebarSignoutMenuLabel", {
                          defaultValue: sidebarSignoutMenuLabel,
                        }),
                      )}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className={"bg-transparent"}>
                  <LucideMessageCircleWarning className="text-destructive" />
                </AlertDialogMedia>
                <AlertDialogTitle>
                  {_.upperFirst(
                    t("sidebarSignoutTitle", {
                      defaultValue: sidebarSignoutTitle,
                    }),
                  )}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {_.upperFirst(
                    t("sidebarSignoutDescription", {
                      defaultValue: sidebarSignoutDescription,
                    }),
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleSignout}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarFooter>
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

export default MESidebarComponent;
