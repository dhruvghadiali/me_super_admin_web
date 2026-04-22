import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import {
  DISTRICTS_SCREEN_VIEW,
  DISTRICTS_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import { getStates } from "@MERedux/districts/districtsAction";
import { districtFormInitalValues } from "@MEUtils/formInitialValues";
import {
  resetPageStates,
  setDistrictsScreenFormValues,
  setDistrictsScreenFormDBOperation,
} from "@MERedux/districts/districtsSlice";
import {
  districtsDataLoaderHeader,
  districtsDataLoaderMessage,
  districtsListNotFoundTitle,
  districtsListNotFoundMessage,
  addNewDistrictButtonLabel,
} from "@MELocalization/en";

import MEDataLoaderComponent from "@MECommonComponents/loader/meDataLoader";
import MEDataListNotFoundComponent from "@MECommonComponents/message/meDataListNotFound";

const DistrictsPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { states, statesLoader, districtsScreenView } = useSelector(
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
    dispatch(setDistrictsScreenFormValues(districtFormInitalValues));
    dispatch(
      setDistrictsScreenFormDBOperation(DISTRICTS_SCREEN_DB_OPERATIONS.ADD),
    );
    dispatch(setDistrictsScreenView(DISTRICTS_SCREEN_VIEW.FORM));
  };

  if (statesLoader) {
    return (
      <MEDataLoaderComponent
        loaderHeader={_.upperFirst(
          t("districtsDataLoaderHeader", {
            defaultValue: districtsDataLoaderHeader,
          }),
        )}
        loaderMessage={_.upperFirst(
          t("districtsDataLoaderMessage", {
            defaultValue: districtsDataLoaderMessage,
          }),
        )}
      />
    );
  }

  if (
    !statesLoader &&
    _.isEmpty(states) &&
    districtsScreenView === DISTRICTS_SCREEN_VIEW.TABLE
  ) {
    return (
      <MEDataListNotFoundComponent
        title={_.upperFirst(
          t("districtsListNotFoundTitle", {
            defaultValue: districtsListNotFoundTitle,
          }),
        )}
        message={_.upperFirst(
          t("districtsListNotFoundMessage", {
            defaultValue: districtsListNotFoundMessage,
          }),
        )}
        addButtonLabel={_.upperFirst(
          t("addNewDistrictButtonLabel", {
            defaultValue: addNewDistrictButtonLabel,
          }),
        )}
        handleTryAgain={handleTryAgain}
        handleNewRecord={handleNewRecord}
      />
    );
  }

  return <p> Districts Page </p>;
};

export default DistrictsPage;
