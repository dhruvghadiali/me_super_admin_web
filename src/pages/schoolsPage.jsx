import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { getschools } from "@MERedux/schools/schoolsAction";
import {
  schoolDataLoaderHeader,
  schoolDataLoaderMessage,
  schoolListNotFoundTitle,
  schoolListNotFoundMessage,
  addNewSchoolButtonLabel,
} from "@MELocalization/en";

import SchoolScreenFormComponent from "@MEScreenComponents/schools/form";
import MEDataLoaderComponent from "@MECommonComponents/loader/dataLoader";
import MEDataListNotFoundComponent from "@MECommonComponents/message/dataListNotFound";

const SchoolsPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { schoolListLoader, schools } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(getschools());
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

  return <SchoolScreenFormComponent />;
};

export default SchoolsPage;
