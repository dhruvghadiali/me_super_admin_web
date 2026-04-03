import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { getschools } from "@MERedux/schools/schoolsAction";
import {
  schoolDataLoaderHeader,
  schoolDataLoaderMessage,
} from "@MELocalization/en";

import SchoolScreenFormComponent from "@MEScreenComponents/schools/form";
import MEDataLoaderComponent from "@MECommonComponents/loader/dataLoader";

const SchoolsPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { schoolListLoader } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(getschools());
  }, [dispatch]);

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

  return <SchoolScreenFormComponent />;
};

export default SchoolsPage;
