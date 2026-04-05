import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { phoneNumberRegex } from "@MEHelpers/regex";
import { Button } from "@MEShadcnComponents/button";
import { SCHOOL_SCREEN_DB_OPERATIONS } from "@MEHelpers/enums";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  addSchoolAdmin,
  removeSchoolAdmin,
  setSchoolAdminsFormValues,
} from "@MERedux/schools/schoolsSlice";
import {
  emailMaxChar,
  emailMinChar,
  phoneNumberChar,
  firstNameMaxChar,
  firstNameMinChar,
  lastNameMaxChar,
  lastNameMinChar,
  schoolAdminsMinLimit,
  schoolAdminsMaxLimit,
} from "@MEUtils/validationConst";
import {
  emailInvalid,
  emailRequired,
  emailMaxLength,
  emailMinLength,
  phoneNumberLength,
  phoneNumberInvalid,
  phoneNumberRequired,
  firstNameMaxLength,
  firstNameMinLength,
  firstNameRequired,
  lastNameMaxLength,
  lastNameMinLength,
  lastNameRequired,
  schoolAdminsMinRequired,
  schoolAdminsMaxAllowed,
} from "@MEUtils/validationMessage";
import {
  schoolAdminCardTitle,
  schoolAdminFirstNameInputLabel,
  schoolAdminLastNameInputLabel,
  schoolAdminEmailInputLabel,
  schoolAdminPhoneNumberInputLabel,
  schoolAdminFirstNameInputPlaceholder,
  schoolAdminLastNameInputPlaceholder,
  schoolAdminEmailInputPlaceholder,
  schoolAdminPhoneNumberInputPlaceholder,
  schoolAdminsFormSaveButtonLabel,
  schoolAdminsFormEditButtonLabel,
  schoolAdminsFormCancelButtonLabel,
  schoolAdminsFormAddAdminButtonLabel,
  schoolAdminsFormSubmitMessage,
} from "@MELocalization/en";

import MEInputComponent from "@MECommonComponents/form/input/meInput";

const SchoolScreenSchoolAdminsFormComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { schoolAdminsFormValues, schoolScreenDBOperation } = useSelector(
    (state) => state.schools,
  );

  const formik = useFormik({
    initialValues: {
      schoolAdmins: schoolAdminsFormValues,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      switch (schoolScreenDBOperation) {
        case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
          dispatch(setSchoolAdminsFormValues(values.schoolAdmins));
          break;
        case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
          break;
        default:
          break;
      }
    },
  });

  const submitButtonText = () => {
    switch (schoolScreenDBOperation) {
      case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
        return _.upperFirst(
          t("schoolAdminsFormSaveButtonLabel", {
            defaultValue: schoolAdminsFormSaveButtonLabel,
          }),
        );
      case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
        return _.upperFirst(
          t("schoolAdminsFormEditButtonLabel", {
            defaultValue: schoolAdminsFormEditButtonLabel,
          }),
        );
      default:
        return _.upperFirst(
          t("schoolAdminsFormSaveButtonLabel", {
            defaultValue: schoolAdminsFormSaveButtonLabel,
          }),
        );
    }
  };

  const addAdmin = () => dispatch(addSchoolAdmin());
  const removeAdmin = (index) => dispatch(removeSchoolAdmin(index));

  // Expose formik methods to parent component
  useImperativeHandle(ref, () => ({
    validateForm: formik.validateForm,
    submitForm: formik.submitForm,
    setTouched: formik.setTouched,
    isValid: formik.isValid,
    errors: formik.errors,
  }));

  // Expose formik methods to parent component
  useImperativeHandle(ref, () => ({
    validateForm: formik.validateForm,
    submitForm: formik.submitForm,
    setTouched: formik.setTouched,
    isValid: formik.isValid,
    errors: formik.errors,
  }));

  const renderAdminForm = (adminIndex) => {
    const adminErrors = formik.errors.schoolAdmins?.[adminIndex] || {};
    const adminTouched = formik.touched.schoolAdmins?.[adminIndex] || {};

    return (
      <Card key={adminIndex} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              {_.upperFirst(
                t("schoolAdminCardTitle", {
                  defaultValue: schoolAdminCardTitle,
                }),
              )}
              {formik.values.schoolAdmins.length > 1
                ? ` ${adminIndex + 1}`
                : ""}
            </CardTitle>
            {formik.values.schoolAdmins.length > schoolAdminsMinLimit && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className={"hover:cursor-pointer"}
                onClick={() => removeAdmin(adminIndex)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-6">
            <MEInputComponent
              required={true}
              label={_.upperFirst(
                t("schoolAdminFirstNameInputLabel", {
                  defaultValue: schoolAdminFirstNameInputLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAdminFirstNameInputPlaceholder", {
                  defaultValue: schoolAdminFirstNameInputPlaceholder,
                }),
              )}
              name={`schoolAdmins[${adminIndex}].firstName`}
              value={formik.values.schoolAdmins[adminIndex]?.firstName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                adminTouched.firstName && adminErrors.firstName
                  ? adminErrors.firstName
                  : ""
              }
            />

            <MEInputComponent
              required={true}
              label={_.upperFirst(
                t("schoolAdminLastNameInputLabel", {
                  defaultValue: schoolAdminLastNameInputLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAdminLastNameInputPlaceholder", {
                  defaultValue: schoolAdminLastNameInputPlaceholder,
                }),
              )}
              name={`schoolAdmins[${adminIndex}].lastName`}
              value={formik.values.schoolAdmins[adminIndex]?.lastName || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                adminTouched.lastName && adminErrors.lastName
                  ? adminErrors.lastName
                  : ""
              }
            />

            <MEInputComponent
              required={true}
              label={_.upperFirst(
                t("schoolAdminEmailInputLabel", {
                  defaultValue: schoolAdminEmailInputLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAdminEmailInputPlaceholder", {
                  defaultValue: schoolAdminEmailInputPlaceholder,
                }),
              )}
              name={`schoolAdmins[${adminIndex}].email`}
              value={formik.values.schoolAdmins[adminIndex]?.email || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                adminTouched.email && adminErrors.email ? adminErrors.email : ""
              }
            />

            <MEInputComponent
              required={true}
              label={_.upperFirst(
                t("schoolAdminPhoneNumberInputLabel", {
                  defaultValue: schoolAdminPhoneNumberInputLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAdminPhoneNumberInputPlaceholder", {
                  defaultValue: schoolAdminPhoneNumberInputPlaceholder,
                }),
              )}
              name={`schoolAdmins[${adminIndex}].phoneNumber`}
              value={formik.values.schoolAdmins[adminIndex]?.phoneNumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                adminTouched.phoneNumber && adminErrors.phoneNumber
                  ? adminErrors.phoneNumber
                  : ""
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="flex justify-end items-center mb-5">
        {schoolAdminsFormValues.length < schoolAdminsMaxLimit && (
          <Button
            type="button"
            onClick={addAdmin}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {_.upperFirst(
              t("schoolAdminsFormAddAdminButtonLabel", {
                defaultValue: schoolAdminsFormAddAdminButtonLabel,
              }),
            )}
          </Button>
        )}
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {schoolAdminsFormValues.map((_, index) => renderAdminForm(index))}

        <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {_.upperFirst(
              t("schoolAdminsFormSubmitMessage", {
                defaultValue: schoolAdminsFormSubmitMessage,
              }),
            )}
          </p>
          <div className="flex items-center gap-3">
            <Button type="submit" className="hover:cursor-pointer">
              {submitButtonText()}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={formik.handleReset}
            >
              {_.upperFirst(
                t("schoolAdminsFormCancelButtonLabel", {
                  defaultValue: schoolAdminsFormCancelButtonLabel,
                }),
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
});

const validationSchema = Yup.object({
  schoolAdmins: Yup.array()
    .of(
      Yup.object({
        firstName: Yup.string()
          .trim()
          .min(firstNameMinChar, firstNameMinLength)
          .max(firstNameMaxChar, firstNameMaxLength)
          .required(firstNameRequired),
        lastName: Yup.string()
          .trim()
          .min(lastNameMinChar, lastNameMinLength)
          .max(lastNameMaxChar, lastNameMaxLength)
          .required(lastNameRequired),
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
      }),
    )
    .min(schoolAdminsMinLimit, schoolAdminsMinRequired)
    .max(schoolAdminsMaxLimit, schoolAdminsMaxAllowed)
    .required(),
});

export default SchoolScreenSchoolAdminsFormComponent;
