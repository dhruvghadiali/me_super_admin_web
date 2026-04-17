import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { getStates } from "@MERedux/states/statesAction";
import { stateFormInitalValues } from "@MEUtils/formInitialValues";
import {
  STATES_SCREEN_VIEW,
  STATES_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  resetPageStates,
  setStatesScreenView,
  setStatesScreenFormValues,
  setStatesScreenFormDBOperation,
} from "@MERedux/states/statesSlice";
import {
  statesDataLoaderHeader,
  statesDataLoaderMessage,
  statesListNotFoundTitle,
  statesListNotFoundMessage,
  addNewStateButtonLabel,
} from "@MELocalization/en";

import StateScreenFormComponent from "@MEScreenComponents/states/form";
import MEDataLoaderComponent from "@MECommonComponents/loader/meDataLoader";
import StatesScreenTableDataComponet from "@MEScreenComponents/states/tableData";
import MEDataListNotFoundComponent from "@MECommonComponents/message/meDataListNotFound";
import MEPageDetailsNotFoundComponent from "@MECommonComponents/message/mePageDetailsNotFound";

const StatesPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { states, statesLoader, statesScreenView } = useSelector(
    (state) => state.states,
  );

  useEffect(() => {
    dispatch(resetPageStates());
    dispatch(getStates());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(getStates());
  };

  const handleNewRecord = () => {
    dispatch(setStatesScreenFormValues(stateFormInitalValues));
    dispatch(setStatesScreenFormDBOperation(STATES_SCREEN_DB_OPERATIONS.ADD));
    dispatch(setStatesScreenView(STATES_SCREEN_VIEW.FORM));
  };

  if (statesLoader) {
    return (
      <MEDataLoaderComponent
        loaderHeader={_.upperFirst(
          t("statesDataLoaderHeader", { defaultValue: statesDataLoaderHeader }),
        )}
        loaderMessage={_.upperFirst(
          t("statesDataLoaderMessage", {
            defaultValue: statesDataLoaderMessage,
          }),
        )}
      />
    );
  }

  if (!statesLoader && _.isEmpty(states) && statesScreenView === STATES_SCREEN_VIEW.TABLE) {
    return (
      <MEDataListNotFoundComponent
        title={_.upperFirst(
          t("statesListNotFoundTitle", {
            defaultValue: statesListNotFoundTitle,
          }),
        )}
        message={_.upperFirst(
          t("statesListNotFoundMessage", {
            defaultValue: statesListNotFoundMessage,
          }),
        )}
        addButtonLabel={_.upperFirst(
          t("addNewStateButtonLabel", {
            defaultValue: addNewStateButtonLabel,
          }),
        )}
        handleTryAgain={handleTryAgain}
        handleNewRecord={handleNewRecord}
      />
    );
  }

  switch (statesScreenView) {
    case STATES_SCREEN_VIEW.TABLE:
      return <StatesScreenTableDataComponet />;
    case STATES_SCREEN_VIEW.FORM:
      return <StateScreenFormComponent />;
    default:
      return <MEPageDetailsNotFoundComponent />;
  }
};

export default StatesPage;
