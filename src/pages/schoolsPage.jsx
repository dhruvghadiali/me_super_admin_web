import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { SCHOOL_INFORMATION_VIEW } from "@MEHelpers/enums";
import { setSchoolInformationView } from "@MERedux/schools/schoolsSlice";
import {
  getStates,
  getschools,
  getSchoolTypes,
  getEducationBoards,
} from "@MERedux/schools/schoolsAction";
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
  const { schoolListLoader, schools, schoolInformationView } = useSelector(
    (state) => state.schools,
  );

  useEffect(() => {
    dispatch(getStates());
    dispatch(getschools());
    dispatch(getSchoolTypes());
    dispatch(getEducationBoards());
    dispatch(setSchoolInformationView(SCHOOL_INFORMATION_VIEW.TABLE));
  }, [dispatch]);

  const handleTryAgain = () => {
    dispatch(getschools());
  };

  const handleNewRecord = () => {
    // TODO: Navigate to add new school form or open modal
    console.log("Add new school clicked");
  };

  if (schoolListLoader) {
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

  if (!schoolListLoader && (_.isEmpty(schools) || _.isNull(schools))) {
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

  switch (schoolInformationView) {
    case SCHOOL_INFORMATION_VIEW.TABLE:
      return <SchoolScreenTableDataComponet />;
    case SCHOOL_INFORMATION_VIEW.FORM:
      return <SchoolScreenFormComponent />;
    default:
      return <MEPageDetailsNotFoundComponent />;
  }
};

export default SchoolsPage;
