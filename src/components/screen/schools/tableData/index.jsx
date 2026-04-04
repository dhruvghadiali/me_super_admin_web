import { useSelector } from "react-redux";
import { useState } from "react";

import _ from "lodash";

import MEDataTableComponent from "@MECommonComponents/table/dataTable/meDataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@MEShadcnComponents/alert-dialog";

const SchoolScreenTableDataComponet = () => {
  const { schoolListLoader, schools } = useSelector((state) => state.schools);
  
  // Alert dialog state
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    action: null,
    row: null,
  });

  const onActionSelect = (action, row) => {
    setAlertDialog({
      open: true,
      action: action,
      row: row,
    });
  };

  const handleDialogAction = () => {
    const { action, row } = alertDialog;
    
    // Handle different actions
    switch (action) {
      case "Edit":
        console.log("Edit school:", row);
        // TODO: Implement edit functionality
        break;
      case "Delete":
        console.log("Delete school:", row);
        // TODO: Implement delete functionality
        break;
      case "View":
        console.log("View school:", row);
        // TODO: Implement view functionality
        break;
      default:
        console.log("Unknown action:", action);
    }
    
    // Close dialog
    setAlertDialog({ open: false, action: null, row: null });
  };

  const handleDialogCancel = () => {
    setAlertDialog({ open: false, action: null, row: null });
  };

  const getDialogContent = () => {
    const { action, row } = alertDialog;
    
    switch (action) {
      case "Edit":
        return {
          title: "Edit School",
          description: `Are you sure you want to edit "${row?.name}"? This will open the edit form.`,
          actionText: "Edit",
          actionVariant: "default",
        };
      case "Delete":
        return {
          title: "Delete School", 
          description: `Are you sure you want to delete "${row?.name}"? This action cannot be undone.`,
          actionText: "Delete",
          actionVariant: "destructive",
        };
      case "View":
        return {
          title: "View School Details",
          description: `View detailed information for "${row?.name}".`,
          actionText: "View",
          actionVariant: "default",
        };
      default:
        return {
          title: "Confirm Action",
          description: "Are you sure you want to perform this action?",
          actionText: "Confirm",
          actionVariant: "default",
        };
    }
  };

  const dialogContent = getDialogContent();

  return (
    <>
      <MEDataTableComponent
        columnConfigration={[
          {
            header: "Action",
            key: "actions",
            width: 100,
            actionList: ["Edit", "Delete", "View"],
            onActionSelect: (action, row) => onActionSelect(action, row),
          },
          { header: "School Name", key: "name", width: 300 },
          { header: "Email", key: "email", width: 300 },
          { header: "Phone Number", key: "phoneNumber", width: 150 },
          { header: "Created At", key: "createdAt", width: 200 },
        ]}
        rows={_.map(schools, (school) => ({
          id: school.id,
          name: _.upperCase(school.name),
          email: _.toLower(school.email),
          phoneNumber: _.toLower(school.phoneNumber),
          createdAt: school.createdAt,
        }))}
      />

      {/* Alert Dialog */}
      <AlertDialog open={alertDialog.open} onOpenChange={(open) => !open && handleDialogCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDialogAction}
              variant={dialogContent.actionVariant}
            >
              {dialogContent.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SchoolScreenTableDataComponet;
