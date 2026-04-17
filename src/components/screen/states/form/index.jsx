import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import { addState, editState } from "@MERedux/states/statesAction";
import { stateFormInitalValues } from "@MEUtils/formInitialValues";
import { stateNameMinChar, stateNameMaxChar } from "@MEUtils/validationConst";
import {
  setAddStateAPIPayload,
  setEditStateAPIPayload,
} from "@MEUtils/apiPayload";
import {
  setStatesScreenView,
  setStatesScreenFormValues,
  setStatesScreenFormDBOperation,
} from "@MERedux/states/statesSlice";
import {
  STATES_SCREEN_VIEW,
  STATES_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  stateNameRequired,
  stateNameMinLength,
  stateNameMaxLength,
} from "@MEUtils/validationMessage";
import {
  statesFormNameInputLabel,
  statesFormNameInputPlaceholder,
  statesFormSubmitButtonLabel,
  statesFormCloseButtonLabel,
  statesAddFormLabel,
  statesEditFormLabel,
  statesAddFormSubTitle,
  statesEditFormSubTitle,
} from "@MELocalization/screen/states/statesTranslationEn";

import MEInputComponent from "@MECommonComponents/form/input/meInput";
import MEScreenHeaderComponent from "@MECommonComponents/header/meScreenHeader";

const StateScreenFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const {
    stateFormValues,
    statesFormError,
    statesFormLoader,
    statesScreenFormDBOperation,
  } = useSelector((state) => state.states);

  const handleClose = () => {
    dispatch(setStatesScreenFormValues(stateFormInitalValues));
    dispatch(setStatesScreenView(STATES_SCREEN_VIEW.TABLE));
    dispatch(setStatesScreenFormDBOperation(STATES_SCREEN_DB_OPERATIONS.ADD));
  };

  const handleFormSubmit = (values) => {
    switch (statesScreenFormDBOperation) {
      case STATES_SCREEN_DB_OPERATIONS.ADD:
        dispatch(addState(setAddStateAPIPayload(values)));
        break;
      case STATES_SCREEN_DB_OPERATIONS.EDIT:
        dispatch(editState(setEditStateAPIPayload(values)));
        break;
      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: stateFormValues,
    validationSchema,
    onSubmit: (values) => handleFormSubmit(values),
  });

  return (
    <>
      <MEScreenHeaderComponent
        title={
          statesScreenFormDBOperation === STATES_SCREEN_DB_OPERATIONS.ADD
            ? _.upperFirst(
                t("statesAddFormLabel", {
                  defaultValue: statesAddFormLabel,
                }),
              )
            : _.upperFirst(
                t("statesEditFormLabel", {
                  defaultValue: statesEditFormLabel,
                }),
              )
        }
        subtitle={
          statesScreenFormDBOperation === STATES_SCREEN_DB_OPERATIONS.ADD
            ? _.upperFirst(
                t("statesAddFormSubTitle", {
                  defaultValue: statesAddFormSubTitle,
                }),
              )
            : _.upperFirst(
                t("statesEditFormSubTitle", {
                  defaultValue: statesEditFormSubTitle,
                }),
              )
        }
      />

      <form onSubmit={formik.handleSubmit} className="space-y-6 mt-10">
        {statesFormError && (
          <div className="w-full rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 mr-4">
            <p className="text-sm text-destructive">{statesFormError}</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-6 p-2">
          {/* State Name Input */}
          <MEInputComponent
            required={true}
            label={_.upperFirst(
              t("statesFormNameInputLabel", {
                defaultValue: statesFormNameInputLabel,
              }),
            )}
            placeholder={_.upperFirst(
              t("statesFormNameInputPlaceholder", {
                defaultValue: statesFormNameInputPlaceholder,
              }),
            )}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
            disabled={statesFormLoader}
          />
        </div>

        <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {_.upperFirst(
              "Please review the information before submitting the form.",
            )}
          </p>
          <div className="flex items-center gap-3">
            <Button
              className={"hover:cursor-pointer"}
              disabled={statesFormLoader}
              onClick={() => handleSubmit()}
            >
              {_.upperFirst(
                t("statesFormSubmitButtonLabel", {
                  defaultValue: statesFormSubmitButtonLabel,
                }),
              )}
            </Button>

            <Button
              variant="outline"
              className={"hover:cursor-pointer ml-2"}
              disabled={statesFormLoader}
              onClick={() => handleClose()}
            >
              {_.upperFirst(
                t("statesFormCloseButtonLabel", {
                  defaultValue: statesFormCloseButtonLabel,
                }),
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(stateNameMinChar, stateNameMinLength)
    .max(stateNameMaxChar, stateNameMaxLength)
    .required(stateNameRequired),
});

export default StateScreenFormComponent;
