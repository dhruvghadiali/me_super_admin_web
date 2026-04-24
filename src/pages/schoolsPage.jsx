import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import {
  SCHOOL_INFORMATION_VIEW,
  SCHOOL_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  resetFormValues,
  setSchoolsInformationView,
  setSchoolsScreenDBOperation,
} from "@/slice/schools/schoolsSlice";
import {
  getStates,
  getschools,
  getSchoolTypes,
  getEducationBoards,
} from "@/slice/schools/schoolsAction";
import {
  schoolDataLoaderHeader,
  schoolDataLoaderMessage,
  schoolListNotFoundTitle,
  addNewSchoolButtonLabel,
  schoolListNotFoundMessage,
} from "@MELocalization/en";

import SchoolScreenFormComponent from "@MEScreenComponents/schools/form";
import MEDataLoaderComponent from "@MECommonComponents/loader/meDataLoader";
import SchoolScreenTableDataComponet from "@MEScreenComponents/schools/tableData";
import MEDataListNotFoundComponent from "@MECommonComponents/message/meDataListNotFound";
import MEPageDetailsNotFoundComponent from "@MECommonComponents/message/mePageDetailsNotFound";

const SchoolsPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const {
    states,
    statesLoader,
    educationBoards,
    educationBoardsLoader,
    schoolTypes,
    schoolTypesLoader,
    schools,
    schoolsLoader,
    schoolsInformationView,
  } = useSelector((state) => state.schools);

  const reduxAPICalls = () => {
    dispatch(getStates());
    dispatch(getschools());
    dispatch(getSchoolTypes());
    dispatch(getEducationBoards());
    dispatch(setSchoolsInformationView(SCHOOL_INFORMATION_VIEW.TABLE));
    dispatch(setSchoolsScreenDBOperation(SCHOOL_SCREEN_DB_OPERATIONS.VIEW));
  };

  useEffect(() => {
    reduxAPICalls();
  }, [dispatch]);

  const handleTryAgain = () => reduxAPICalls();

  const handleNewRecord = () => {
    dispatch(resetFormValues());
    dispatch(setSchoolsInformationView(SCHOOL_INFORMATION_VIEW.FORM));
    dispatch(setSchoolsScreenDBOperation(SCHOOL_SCREEN_DB_OPERATIONS.ADD));
  };

  if (
    schoolsLoader ||
    statesLoader ||
    educationBoardsLoader ||
    schoolTypesLoader
  ) {
    return (
      <MEDataLoaderComponent
        loaderHeader={_.upperFirst(
          t("schoolDataLoaderHeader", { defaultValue: schoolDataLoaderHeader }),
        )}
        loaderMessage={t("schoolDataLoaderMessage", {
          defaultValue: schoolDataLoaderMessage,
        })}
      />
    );
  }

  if (
    (!schoolsLoader && _.isEmpty(schools)) ||
    (!statesLoader && _.isEmpty(states)) ||
    (!educationBoardsLoader && _.isEmpty(educationBoards)) ||
    (!schoolTypesLoader && _.isEmpty(schoolTypes))
  ) {
    return (
      <MEDataListNotFoundComponent
        title={_.upperFirst(
          t("schoolListNotFoundTitle", {
            defaultValue: schoolListNotFoundTitle,
          }),
        )}
        message={_.upperFirst(
          t("schoolListNotFoundMessage", {
            defaultValue: schoolListNotFoundMessage,
          }),
        )}
        addButtonLabel={_.upperFirst(
          t("addNewSchoolButtonLabel", {
            defaultValue: addNewSchoolButtonLabel,
          }),
        )}
        handleTryAgain={handleTryAgain}
        handleNewRecord={handleNewRecord}
      />
    );
  }

  switch (schoolsInformationView) {
    case SCHOOL_INFORMATION_VIEW.TABLE:
      return <SchoolScreenTableDataComponet />;
    case SCHOOL_INFORMATION_VIEW.FORM:
      return <SchoolScreenFormComponent />;
    default:
      return <MEPageDetailsNotFoundComponent />;
  }
};

export default SchoolsPage;
