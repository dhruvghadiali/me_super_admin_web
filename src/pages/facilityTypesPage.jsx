import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { facilityTypeFormInitalValues } from "@MEUtils/formInitialValues";
import { getFacilityTypes } from "@MERedux/facilityTypes/facilityTypesAction";
import {
  FACILITY_TYPES_SCREEN_VIEW,
  FACILITY_TYPES_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  resetPageStates,
  setFacilityTypesScreenView,
  setFacilityTypesScreenFormValues,
  setFacilityTypesScreenFormDBOperation,
} from "@MERedux/facilityTypes/facilityTypesSlice";
import {
  facilityTypesDataLoaderHeader,
  facilityTypesDataLoaderMessage,
  facilityTypesListNotFoundTitle,
  facilityTypesListNotFoundMessage,
  addNewFacilityTypeButtonLabel,
} from "@MELocalization/en";

import MEDataLoaderComponent from "@MECommonComponents/loader/meDataLoader";
import FacilityTypesScreenFormComponent from "@MEScreenComponents/facilityTypes/form";
import MEDataListNotFoundComponent from "@MECommonComponents/message/meDataListNotFound";
import FacilityTypesScreenTableDataComponet from "@MEScreenComponents/facilityTypes/tableData";
import MEPageDetailsNotFoundComponent from "@MECommonComponents/message/mePageDetailsNotFound";

const FacilityTypesPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { facilityTypes, facilityTypesLoader, facilityTypesScreenView } =
    useSelector((state) => state.facilityTypes);

  useEffect(() => {
    dispatch(resetPageStates());
    dispatch(getFacilityTypes());
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(getFacilityTypes());
  };

  const handleNewRecord = () => {
    dispatch(setFacilityTypesScreenFormValues(facilityTypeFormInitalValues));
    dispatch(
      setFacilityTypesScreenFormDBOperation(
        FACILITY_TYPES_SCREEN_DB_OPERATIONS.ADD,
      ),
    );
    dispatch(setFacilityTypesScreenView(FACILITY_TYPES_SCREEN_VIEW.FORM));
  };

  if (facilityTypesLoader) {
    return (
      <MEDataLoaderComponent
        loaderHeader={_.upperFirst(
          t("facilityTypesDataLoaderHeader", {
            defaultValue: facilityTypesDataLoaderHeader,
          }),
        )}
        loaderMessage={_.upperFirst(
          t("facilityTypesDataLoaderMessage", {
            defaultValue: facilityTypesDataLoaderMessage,
          }),
        )}
      />
    );
  }

  if (!facilityTypesLoader && _.isEmpty(facilityTypes) && facilityTypesScreenView === FACILITY_TYPES_SCREEN_VIEW.TABLE) {
    return (
      <MEDataListNotFoundComponent
        title={_.upperFirst(
          t("facilityTypesListNotFoundTitle", {
            defaultValue: facilityTypesListNotFoundTitle,
          }),
        )}
        message={_.upperFirst(
          t("facilityTypesListNotFoundMessage", {
            defaultValue: facilityTypesListNotFoundMessage,
          }),
        )}
        addButtonLabel={_.upperFirst(
          t("addNewFacilityTypeButtonLabel", {
            defaultValue: addNewFacilityTypeButtonLabel,
          }),
        )}
        handleTryAgain={handleTryAgain}
        handleNewRecord={handleNewRecord}
      />
    );
  }

  switch (facilityTypesScreenView) {
    case FACILITY_TYPES_SCREEN_VIEW.TABLE:
      return <FacilityTypesScreenTableDataComponet />;
    case FACILITY_TYPES_SCREEN_VIEW.FORM:
      return <FacilityTypesScreenFormComponent />;
    default:
      return <MEPageDetailsNotFoundComponent />;
  }
};

export default FacilityTypesPage;
