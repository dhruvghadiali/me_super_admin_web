import { useState } from "react";
import { Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import {
  SCHOOL_INFORMATION_VIEW,
  SCHOOL_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  resetFormValues,
  setSchoolsInformationView,
  setOrganizationFormValues,
  setSchoolsScreenDBOperation,
  setOrganizationMembersFormValues,
  setSchoolFormValues,
  setSchoolAddressesFormValues
} from "@/slice/schools/schoolsSlice";
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

import MEScreenHeaderComponent from "@MECommonComponents/header/meScreenHeader";
import MEDataTableComponent from "@MECommonComponents/table/dataTable/meDataTable";

const SchoolScreenTableDataComponet = () => {
  const dispatch = useDispatch();

  const { tableRows } = useSelector((state) => state.schools);

  // Alert dialog state
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    action: null,
    row: null,
  });

  const closeDialog = () => {
    setAlertDialog({
      open: false,
      action: null,
      row: null,
    });
  };

  const getDialogContent = () => {
    const { action, row } = alertDialog;

    switch (action) {
      case SCHOOL_SCREEN_DB_OPERATIONS.DELETE:
        return {
          title: "Delete School",
          description: `Are you sure you want to delete "${row?.name}"? This action cannot be undone.`,
          actionText: "Delete",
          actionVariant: "destructive",
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

  const onActionSelect = (action, row) => {
    switch (action.value) {
      case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
        dispatch(setSchoolsInformationView(SCHOOL_INFORMATION_VIEW.FORM));
        dispatch(setSchoolsScreenDBOperation(SCHOOL_SCREEN_DB_OPERATIONS.EDIT));
        dispatch(
          setOrganizationFormValues(
            row.organization
              ? {
                  ...row.organization,
                  state: _.get(row.organization, "state.id", {}),
                  district: _.get(row.organization, "district.id", {}),
                  city: _.get(row.organization, "city.id", {}),
                  areaName: _.get(row.organization, "areaName.id", {}),
                  zipcode: _.get(row.organization, "zipcode.id", {}),
                }
              : {},
          ),
        );
        dispatch(
          setOrganizationMembersFormValues(
            _.map(_.get(row.organization, "members", []), (member) => ({
              ...member,
              state: _.get(member, "state.id", {}),
              district: _.get(member, "district.id", {}),
              city: _.get(member, "city.id", {}),
              areaName: _.get(member, "areaName.id", {}),
              zipcode: _.get(member, "zipcode.id", {}),
            })),
          ),
        );
        dispatch(
          setSchoolFormValues( 
            row.school
              ? {
                  ...row.school,
                  schoolType: _.get(row.school, "schoolType.id", {}),
                  educationBoards: _.map(
                    _.get(row.school, "educationBoards", []),
                    (board) => board.id,
                  ),
                }
              : {},
          ),
        );
        dispatch(
          setSchoolAddressesFormValues(
            _.map(_.get(row, "schoolAddresses", []), (address) => ({
              ...address,
              state: _.get(address, "state.id", {}),
              district: _.get(address, "district.id", {}),
              city: _.get(address, "city.id", {}),
              areaName: _.get(address, "areaName.id", {}),
              zipcode: _.get(address, "zipcode.id", {}),
            })),
          ),
        );
        break;
      case SCHOOL_SCREEN_DB_OPERATIONS.DELETE:
        setAlertDialog({
          open: true,
          action: action,
          row: row,
        });
        break;
      case SCHOOL_SCREEN_DB_OPERATIONS.VIEW:
        break;
      default:
        break;
    }
  };

  const handleDialogAction = () => {
    const { action, row } = alertDialog;

    // Handle different actions
    switch (action.value) {
      case SCHOOL_SCREEN_DB_OPERATIONS.DELETE:
        // TODO: Implement delete functionality
        break;
      default:
        break;
    }

    // Close dialog
    closeDialog();
  };

  const onAddClick = () => {
    dispatch(resetFormValues());
    dispatch(setSchoolsInformationView(SCHOOL_INFORMATION_VIEW.FORM));
    dispatch(setSchoolsScreenDBOperation(SCHOOL_SCREEN_DB_OPERATIONS.ADD));
  };

  const handleDialogCancel = () => closeDialog();

  const dialogContent = getDialogContent();

  const columnConfigration = [
    {
      header: "Action",
      key: "actions",
      width: 100,
      actionList: [
        {
          label: _.upperFirst(_.toLower(SCHOOL_SCREEN_DB_OPERATIONS.EDIT)),
          value: SCHOOL_SCREEN_DB_OPERATIONS.EDIT,
        },
        {
          label: _.upperFirst(_.toLower(SCHOOL_SCREEN_DB_OPERATIONS.DELETE)),
          value: SCHOOL_SCREEN_DB_OPERATIONS.DELETE,
        },
        {
          label: _.upperFirst(_.toLower(SCHOOL_SCREEN_DB_OPERATIONS.VIEW)),
          value: SCHOOL_SCREEN_DB_OPERATIONS.VIEW,
        },
      ],
      onActionSelect: (action, row) => onActionSelect(action, row),
    },
    { header: "School Name", key: "name", width: 300 },
    { header: "Email", key: "email", width: 300 },
    { header: "Phone Number", key: "phoneNumber", width: 150 },
    { header: "Created At", key: "createdAt", width: 200 },
  ];

  return (
    <>
      <div className="flex items-center mb-4 justify-between">
        <MEScreenHeaderComponent
          title={"Schools Directory"}
          subtitle={"Browse and manage school information with full control"}
        />
        <Button className={"hover:cursor-pointer"} onClick={() => onAddClick()}>
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>
      <MEDataTableComponent
        columnConfigration={columnConfigration}
        rows={tableRows}
      />

      {/* Alert Dialog */}
      <AlertDialog
        open={alertDialog.open}
        onOpenChange={(open) => !open && handleDialogCancel()}
      >
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
