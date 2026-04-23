import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import moment from "moment";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import { phoneNumberRegex } from "@MEHelpers/regex";
import { Spinner } from "@MEShadcnComponents/spinner";
import { editSchool } from "@MERedux/schools/schoolsAction";
import { setEditSchoolInformation } from "@MEUtils/apiPayload";
import {
  setSchoolFormValues,
  setSchoolFormValidationStatus,
} from "@MERedux/schools/schoolsSlice";
import {
  SELECTION_COMPONENT_VARIANTS,
  SCHOOL_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  emailMaxChar,
  emailMinChar,
  phoneNumberChar,
  schoolNameMaxChar,
  schoolNameMinChar,
  schoolShortNameMaxChar,
  schoolShortNameMinChar,
  schoolAffiliateNumberMaxChar,
  schoolAffiliateNumberMinChar,
  schoolEstablishedYearMinNumber,
  schoolEditionBoardMaxLimit,
  schoolEditionBoardMinLimit,
} from "@MEUtils/validationConst";
import {
  emailInvalid,
  emailRequired,
  emailMinLength,
  emailMaxLength,
  phoneNumberLength,
  phoneNumberInvalid,
  phoneNumberRequired,
  schoolNameRequired,
  schoolNameMaxLength,
  schoolNameMinLength,
  schoolShortNameRequired,
  schoolShortNameMaxLength,
  schoolShortNameMinLength,
  schoolAffiliateNumberRequired,
  schoolAffiliateNumberMaxLength,
  schoolAffiliateNumberMinLength,
  schoolEstablishedYearInvalid,
  schoolEstablishedYearMinYear,
  schoolEstablishedYearMaxYear,
  schoolEstablishedYearRequired,
  schoolTypeRequired,
  educationBoardsMin,
  educationBoardsMax,
  educationBoardsRequired,
} from "@MEUtils/validationMessage";
import {
  schoolFormNameInputLabel,
  schoolFormNameInputPlaceholder,
  schoolFormShortNameInputLabel,
  schoolFormShortNameInputPlaceholder,
  schoolFormAffiliateNumberInputLabel,
  schoolFormAffiliateNumberInputPlaceholder,
  schoolFormEmailInputLabel,
  schoolFormEmailInputPlaceholder,
  schoolFormPhoneNumberInputLabel,
  schoolFormPhoneNumberInputPlaceholder,
  schoolFormEstablishedYearInputLabel,
  schoolFormEstablishedYearInputPlaceholder,
  schoolFormSchoolTypeSelectionLabel,
  schoolFormSchoolTypeSelectionPlaceholder,
  schoolFormEducationBoardsSelectionLabel,
  schoolFormEducationBoardsSelectionPlaceholder,
  schoolFormSaveButtonLabel,
  schoolFormEditButtonLabel,
  schoolFormCancelButtonLabel,
  schoolFormSubmitMessage,
} from "@MELocalization/en";

import MEInputComponent from "@MECommonComponents/form/input/meInput";
import MESelectComponent from "@MECommonComponents/form/select/meSelect";
import MEMultiSelectionComponent from "@MECommonComponents/form/combobox/meMultiSelection";

const SchoolScreenSchoolFormComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const {
    schoolTypes,
    educationBoards,
    schoolFormValues,
    schoolsScreenDBOperation,
    isSchoolFormValidated,
    schoolsScreenDBOperationLoader,
  } = useSelector((state) => state.schools);

  const changeSchoolFormValidationStatus = (status) => {
    dispatch(setSchoolFormValidationStatus(status));
  };

  // Helper function to check if form is valid
  const checkFormValidation = async () => {
    try {
      const errors = await formik.validateForm();
      const hasErrors = Object.keys(errors).length > 0;

      // Check if form has values using formik state (not Redux state)
      const currentFormValues = formik.values || {};
      const hasValues = Object.values(currentFormValues).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          (Array.isArray(value) ? value.length > 0 : true),
      );

      // Form is valid if no errors and has some values
      const isValid = !hasErrors && hasValues;
      changeSchoolFormValidationStatus(isValid);
      return isValid;
    } catch (error) {
      console.error("Validation check failed:", error);
      changeSchoolFormValidationStatus(false);
      return false;
    }
  };

  const formik = useFormik({
    initialValues: schoolFormValues,
    validationSchema,
    onSubmit: async (values) => {
      const isValid = await checkFormValidation();

      if (isValid) {
        switch (schoolsScreenDBOperation) {
          case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
            changeSchoolFormValidationStatus(true);
            dispatch(setSchoolFormValues(values));
            break;
          case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
            changeSchoolFormValidationStatus(true);
            dispatch(editSchool(setEditSchoolInformation(values)));
            break;
          default:
            break;
        }
      } else {
        changeSchoolFormValidationStatus(false);
      }
    },
  });

  // Check validation status on initial mount
  useEffect(() => {
    switch (schoolsScreenDBOperation) {
      case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
        dispatch(setSchoolFormValues(formik.values));
        checkFormValidation();
        break;
      default:
        break;
    }
  }, [dispatch]);

  // Check validation status when form values, errors, or touched state changes
  useEffect(() => {
    switch (schoolsScreenDBOperation) {
      case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
        checkFormValidation();
        break;
      default:
        break;
    }
  }, [formik.values, formik.errors, formik.touched, schoolFormValues]);

  // Handle cancel/reset with validation check
  const handleCancel = async () => {
    formik.handleReset();
    // After reset, check validation status
    setTimeout(() => {
      checkFormValidation();
    }, 100); // Small delay to ensure reset is complete
  };

  // Expose formik methods to parent component
  useImperativeHandle(ref, () => ({
    validateForm: formik.validateForm,
    submitForm: formik.submitForm,
    setTouched: formik.setTouched,
    isValid: formik.isValid,
    errors: formik.errors,
  }));

  const submitButtonText = () => {
    switch (schoolsScreenDBOperation) {
      case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
        return _.upperFirst(
          t("schoolFormSaveButtonLabel", {
            defaultValue: schoolFormSaveButtonLabel,
          }),
        );
      case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
        return _.upperFirst(
          t("schoolFormEditButtonLabel", {
            defaultValue: schoolFormEditButtonLabel,
          }),
        );
      default:
        return _.upperFirst(
          t("schoolFormSaveButtonLabel", {
            defaultValue: schoolFormSaveButtonLabel,
          }),
        );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-6 p-2">
        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("schoolFormNameInputLabel", {
              defaultValue: schoolFormNameInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormNameInputPlaceholder", {
              defaultValue: schoolFormNameInputPlaceholder,
            }),
          )}
          name={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
        />

        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("schoolFormShortNameInputLabel", {
              defaultValue: schoolFormShortNameInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormShortNameInputPlaceholder", {
              defaultValue: schoolFormShortNameInputPlaceholder,
            }),
          )}
          name={"shortName"}
          value={formik.values.shortName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.shortName && formik.errors.shortName
              ? formik.errors.shortName
              : ""
          }
        />

        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("schoolFormAffiliateNumberInputLabel", {
              defaultValue: schoolFormAffiliateNumberInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormAffiliateNumberInputPlaceholder", {
              defaultValue: schoolFormAffiliateNumberInputPlaceholder,
            }),
          )}
          name={"affiliateNumber"}
          value={formik.values.affiliateNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.affiliateNumber && formik.errors.affiliateNumber
              ? formik.errors.affiliateNumber
              : ""
          }
        />

        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("schoolFormEmailInputLabel", {
              defaultValue: schoolFormEmailInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormEmailInputPlaceholder", {
              defaultValue: schoolFormEmailInputPlaceholder,
            }),
          )}
          name={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        />

        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("schoolFormPhoneNumberInputLabel", {
              defaultValue: schoolFormPhoneNumberInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormPhoneNumberInputPlaceholder", {
              defaultValue: schoolFormPhoneNumberInputPlaceholder,
            }),
          )}
          name={"phoneNumber"}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""
          }
        />

        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("schoolFormEstablishedYearInputLabel", {
              defaultValue: schoolFormEstablishedYearInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormEstablishedYearInputPlaceholder", {
              defaultValue: schoolFormEstablishedYearInputPlaceholder,
            }),
          )}
          name={"establishedYear"}
          value={formik.values.establishedYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.establishedYear && formik.errors.establishedYear
              ? formik.errors.establishedYear
              : ""
          }
        />

        <MESelectComponent
          disabled={false}
          required={true}
          clearable={true}
          label={_.upperFirst(
            t("schoolFormSchoolTypeSelectionLabel", {
              defaultValue: schoolFormSchoolTypeSelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormSchoolTypeSelectionPlaceholder", {
              defaultValue: schoolFormSchoolTypeSelectionPlaceholder,
            }),
          )}
          name={"schoolType"}
          items={schoolTypes}
          message={
            formik.touched.schoolType && formik.errors.schoolType
              ? formik.errors.schoolType
              : ""
          }
          selectedValue={formik.values.schoolType}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => formik.setFieldValue("schoolType", value)}
          onBlur={formik.handleBlur}
        />

        <MEMultiSelectionComponent
          disabled={false}
          required={true}
          clearable={true}
          label={_.upperFirst(
            t("schoolFormEducationBoardsSelectionLabel", {
              defaultValue: schoolFormEducationBoardsSelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("schoolFormEducationBoardsSelectionPlaceholder", {
              defaultValue: schoolFormEducationBoardsSelectionPlaceholder,
            }),
          )}
          name={"educationBoards"}
          items={educationBoards}
          message={
            formik.touched.educationBoards && formik.errors.educationBoards
              ? formik.errors.educationBoards
              : ""
          }
          selectedValues={formik.values.educationBoards}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(values) =>
            formik.setFieldValue("educationBoards", values)
          }
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {_.upperFirst(
            t("schoolFormSubmitMessage", {
              defaultValue: schoolFormSubmitMessage,
            }),
          )}
        </p>
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            className="hover:cursor-pointer"
            disabled={schoolsScreenDBOperationLoader}
          >
            {submitButtonText()}
            {schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT &&
              schoolsScreenDBOperationLoader && <Spinner />}
          </Button>
          {schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD && (
            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleCancel}
            >
              {_.upperFirst(
                t("schoolFormCancelButtonLabel", {
                  defaultValue: schoolFormCancelButtonLabel,
                }),
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
});

const validationSchema = Yup.object({
  affiliateNumber: Yup.string()
    .trim()
    .min(schoolAffiliateNumberMinChar, schoolAffiliateNumberMinLength)
    .max(schoolAffiliateNumberMaxChar, schoolAffiliateNumberMaxLength)
    .required(schoolAffiliateNumberRequired),
  name: Yup.string()
    .trim()
    .min(schoolNameMinChar, schoolNameMinLength)
    .max(schoolNameMaxChar, schoolNameMaxLength)
    .required(schoolNameRequired),
  shortName: Yup.string()
    .trim()
    .min(schoolShortNameMinChar, schoolShortNameMinLength)
    .max(schoolShortNameMaxChar, schoolShortNameMaxLength)
    .required(schoolShortNameRequired),
  email: Yup.string()
    .trim()
    .email(emailInvalid)
    .min(emailMinChar, emailMinLength)
    .max(emailMaxChar, emailMaxLength)
    .required(emailRequired),
  phoneNumber: Yup.string()
    .trim()
    .matches(phoneNumberRegex, phoneNumberInvalid)
    .min(phoneNumberChar, phoneNumberLength)
    .max(phoneNumberChar, phoneNumberLength)
    .required(phoneNumberRequired),
  establishedYear: Yup.number()
    .typeError(schoolEstablishedYearInvalid)
    .min(schoolEstablishedYearMinNumber, schoolEstablishedYearMinYear)
    .max(moment().year(), schoolEstablishedYearMaxYear)
    .required(schoolEstablishedYearRequired),
  schoolType: Yup.string().trim().required(schoolTypeRequired),
  educationBoards: Yup.array()
    .of(Yup.string().trim())
    .min(schoolEditionBoardMinLimit, educationBoardsMin)
    .max(schoolEditionBoardMaxLimit, educationBoardsMax)
    .required(educationBoardsRequired),
});

export default SchoolScreenSchoolFormComponent;
