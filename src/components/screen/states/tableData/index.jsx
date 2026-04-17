import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import { deleteState } from "@MERedux/states/statesAction";
import { stateFormInitalValues } from "@MEUtils/formInitialValues";
import { setDeleteStateAPIPayload } from "@MEUtils/apiPayload/statesAPIPaylod";
import {
  STATES_SCREEN_VIEW,
  STATES_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  setStatesScreenView,
  setStatesScreenFormValues,
  setStatesScreenFormDBOperation,
} from "@MERedux/states/statesSlice";
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
import {
  deleteStateAlertDialogTitle,
  deleteStateAlertDialogDescription,
  deleteStateAlertDialogActionText,
  deleteStateAlertDialogCancelText,
  defaultAlertDialogTitle,
  defaultAlertDialogDescription,
  defaultAlertDialogActionText,
  stateNameColumnLabel,
  stateDistrictsCountColumnLabel,
  stateActionsColumnLabel,
  addStateButtonLabel,
} from "@MELocalization/en";

import MEScreenHeaderComponent from "@MECommonComponents/header/meScreenHeader";
import MEDataTableComponent from "@MECommonComponents/table/dataTable/meDataTable";

const StatesScreenTableDataComponet = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { states } = useSelector((state) => state.schools);

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

    switch (_.get(action, "value", null)) {
      case STATES_SCREEN_DB_OPERATIONS.DELETE:
        return {
          title: _.upperFirst(
            t("deleteStateAlertDialogTitle", {
              defaultValue: deleteStateAlertDialogTitle,
            }),
          ),
          description: _.upperFirst(
            t("deleteStateAlertDialogDescription", {
              defaultValue: deleteStateAlertDialogDescription,
            }),
          ),
          actionText: _.upperFirst(
            _.toLower(
              t("deleteStateAlertDialogActionText", {
                defaultValue: deleteStateAlertDialogActionText,
              }),
            ),
          ),
          actionVariant: "destructive",
        };
      default:
        return {
          title: _.upperFirst(
            t("defaultAlertDialogTitle", {
              defaultValue: defaultAlertDialogTitle,
            }),
          ),
          description: _.upperFirst(
            t("defaultAlertDialogDescription", {
              defaultValue: defaultAlertDialogDescription,
            }),
          ),
          actionText: _.upperFirst(
            _.toLower(
              t("defaultAlertDialogActionText", {
                defaultValue: defaultAlertDialogActionText,
              }),
            ),
          ),
          actionVariant: "default",
        };
    }
  };

  const onActionSelect = (action, row) => {
    switch (action.value) {
      case STATES_SCREEN_DB_OPERATIONS.EDIT:
        dispatch(setStatesScreenView(STATES_SCREEN_VIEW.FORM));
        dispatch(
          setStatesScreenFormDBOperation(STATES_SCREEN_DB_OPERATIONS.EDIT),
        );
        dispatch(setStatesScreenFormValues(row));
        break;
      case STATES_SCREEN_DB_OPERATIONS.DELETE:
        setAlertDialog({
          open: true,
          action: action,
          row: row,
        });
        break;
      case STATES_SCREEN_DB_OPERATIONS.VIEW:
        break;
      default:
        break;
    }
  };

  const handleDialogAction = () => {
    const { action, row } = alertDialog;

    switch (action.value) {
      case STATES_SCREEN_DB_OPERATIONS.DELETE:
        dispatch(deleteState(setDeleteStateAPIPayload(row)));
        break;
      default:
        break;
    }

    // Close dialog
    closeDialog();
  };

  const onAddClick = () => {
    dispatch(setStatesScreenFormValues(stateFormInitalValues));
    dispatch(setStatesScreenView(STATES_SCREEN_VIEW.FORM));
    dispatch(setStatesScreenFormDBOperation(STATES_SCREEN_DB_OPERATIONS.ADD));
  };

  const handleDialogCancel = () => closeDialog();

  const dialogContent = getDialogContent();

  const columnConfigration = [
    {
      header: _.startCase(
        t("stateActionsColumnLabel", {
          defaultValue: stateActionsColumnLabel,
        }),
      ),
      key: "actions",
      width: 100,
      actionList: [
        {
          label: _.upperFirst(_.toLower(STATES_SCREEN_DB_OPERATIONS.EDIT)),
          value: STATES_SCREEN_DB_OPERATIONS.EDIT,
        },
        {
          label: _.upperFirst(_.toLower(STATES_SCREEN_DB_OPERATIONS.DELETE)),
          value: STATES_SCREEN_DB_OPERATIONS.DELETE,
        },
      ],
      onActionSelect: (action, row) => onActionSelect(action, row),
    },
    {
      header: _.startCase(
        t("stateNameColumnLabel", {
          defaultValue: stateNameColumnLabel,
        }),
      ),
      key: "name",
      width: 300,
    },
    {
      header: _.startCase(
        t("stateDistrictsCountColumnLabel", {
          defaultValue: stateDistrictsCountColumnLabel,
        }),
      ),
      key: "districtsCount",
      width: 200,
    },
  ];

  return (
    <>
      <div className="flex items-center mb-4 justify-between">
        <MEScreenHeaderComponent
          title={"States"}
          subtitle={"Manage states information and related details"}
        />
        <Button className={"hover:cursor-pointer"} onClick={() => onAddClick()}>
          <Plus className="h-4 w-4" />
          {_.startCase(
            t("addStateButtonLabel", {
              defaultValue: addStateButtonLabel,
            }),
          )}
        </Button>
      </div>
      <MEDataTableComponent
        columnConfigration={columnConfigration}
        rows={states}
      />

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
            <AlertDialogCancel
              onClick={handleDialogCancel}
              className={"hover:cursor-pointer"}
            >
              {_.upperFirst(
                t("deleteStateAlertDialogCancelText", {
                  defaultValue: deleteStateAlertDialogCancelText,
                }),
              )}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDialogAction}
              variant={dialogContent.actionVariant}
              className={"hover:cursor-pointer"}
            >
              {dialogContent.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StatesScreenTableDataComponet;
