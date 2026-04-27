import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFormik } from "formik";
import { Plus, Trash2, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { phoneNumberRegex } from "@MEHelpers/regex";
import { Button } from "@MEShadcnComponents/button";
import { Spinner } from "@MEShadcnComponents/spinner";
import { SCHOOL_SCREEN_DB_OPERATIONS } from "@MEHelpers/enums";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  setFormHasError,
  addSchoolAddressForm,
  removeSchoolAddress,
  setSchoolAddressesFormValues,
  setSchoolAdminsFormValidationStatus,
} from "@MERedux/schools/schoolsSlice";
import {
  addSchoolAddress,
  editSchoolAdminProfile,
} from "@MERedux/schools/schoolsAction";
import {
  setEditSchoolAdminProfileAPIPayload,
  setAddSchoolAddressAPIPaylod,
} from "@MEUtils/apiPayload";
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
  const {
    schoolAddressesFormValues,
    schoolsScreenDBOperation,
    schoolsScreenDBOperationLoader,
    isSchoolAddressesFormValid,
    isSchoolAdminsFormValidated,
    schoolFormValues,
  } = useSelector((state) => state.schools);

  const changeSchoolAdminsFormValidationStatus = (status) => {
    dispatch(setSchoolAdminsFormValidationStatus(status));
  };

  // Helper function to check if form is valid
  const checkFormValidation = async () => {
    try {
      const errors = await formik.validateForm();
      const hasErrors = Object.keys(errors).length > 0;

      // Check if form has values using formik state (not Redux state)
      const currentFormValues = formik.values.schoolAdmins || [];
      const hasValues =
        currentFormValues.length > 0 &&
        currentFormValues.some((admin) =>
          Object.values(admin || {}).some(
            (value) => value !== null && value !== undefined && value !== "",
          ),
        );

      // Form is valid if no errors and has some values
      const isValid = !hasErrors && hasValues;
      changeSchoolAdminsFormValidationStatus(isValid);
      return isValid;
    } catch (error) {
      console.error("Validation check failed:", error);
      changeSchoolAdminsFormValidationStatus(false);
      return false;
    }
  };

  const setFormValuesToRedux = (schoolAdmins) => {
    if (
      _.isArray(schoolAddressesFormValues) &&
      _.size(schoolAddressesFormValues) > 0
    ) {
      const updatedAddresses = schoolAddressesFormValues.map(
        (address, index) => ({
          ...address,
          schoolAdmin: schoolAdmins[index] || null,
        }),
      );
      dispatch(setSchoolAddressesFormValues(updatedAddresses));
    }
  };

  const formik = useFormik({
    initialValues: {
      schoolAdmins:
        _.isArray(schoolAddressesFormValues) &&
        _.size(schoolAddressesFormValues) > 0
          ? schoolAddressesFormValues.map((address) => address.schoolAdmin)
          : [organizationMembersInitialValues],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const isValid = await checkFormValidation();

      if (isValid) {
        switch (schoolsScreenDBOperation) {
          case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
            changeSchoolAdminsFormValidationStatus(true);
            setFormValuesToRedux(values.schoolAdmins);
            break;
          case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
            changeSchoolAdminsFormValidationStatus(true);
            break;
          default:
            break;
        }
      } else {
        changeSchoolAdminsFormValidationStatus(false);
      }
    },
  });

  // Check validation status on initial mount
  useEffect(() => {
    switch (schoolsScreenDBOperation) {
      case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
        // Check initial validation status
        checkFormValidation();
        break;
      case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
        checkFormValidation();
        break;
      default:
        break;
    }
  }, [dispatch]);

  // Check validation status when form values, errors, or touched state changes
  useEffect(() => {
    setFormValuesToRedux(formik.values.schoolAdmins);
    switch (schoolsScreenDBOperation) {
      case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
        checkFormValidation();
        break;
      case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
        checkFormValidation();
        break;
      default:
        break;
    }
  }, [formik.values, formik.errors, formik.touched]);

  // Handle cancel/reset with validation check
  const handleCancel = async () => {
    formik.handleReset();
    // After reset, check validation status
    setTimeout(() => {
      checkFormValidation();
    }, 100); // Small delay to ensure reset is complete
  };

  const submitButtonText = () => {
    switch (schoolsScreenDBOperation) {
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

  const addAdmin = () => dispatch(addSchoolAddressForm());
  const removeAdmin = (index) => dispatch(removeSchoolAddress(index));

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

  const saveData = async (index) => {
    if (await checkFormValidation()) {
      switch (_.get(schoolAddressesFormValues[index], "dbOperation", "")) {
        case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
          dispatch(
            editSchoolAdminProfile(
              setEditSchoolAdminProfileAPIPayload(
                formik.values.schoolAdmins[index],
              ),
            ),
          );
          break;
        case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
          if (isSchoolAddressesFormValid && isSchoolAdminsFormValidated) {
            dispatch(
              addSchoolAddress(
                setAddSchoolAddressAPIPaylod({
                  ...schoolAddressesFormValues[index],
                  schoolId: schoolFormValues.id,
                }),
              ),
            );
            dispatch(setFormHasError(false));
          } else {
            dispatch(setFormHasError(true));
          }
          break;
          break;
        default:
          break;
      }
    } else {
      await formik.validateForm();

      // Set all school admin fields as touched to display errors
      const touchedState = {
        schoolAdmins: _.map(formik.values.schoolAdmins, () => ({
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
        })),
      };

      formik.setTouched(touchedState);
    }
  };

  const renderAdminForm = (adminIndex) => {
    const adminErrors = formik.errors.schoolAdmins?.[adminIndex] || {};
    const adminTouched = formik.touched.schoolAdmins?.[adminIndex] || {};
    const schoolAddress = _.upperFirst(
      _.get(schoolAddressesFormValues, `[${adminIndex}].address`, ""),
    );

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
              <p className="text-xs">{`(${schoolAddress})`}</p>
            </CardTitle>
            <div className="flex gap-x-2.5">
              {schoolsScreenDBOperation ===
                SCHOOL_SCREEN_DB_OPERATIONS.EDIT && (
                <Button
                  type="button"
                  size="sm"
                  className={"hover:cursor-pointer"}
                  disabled={schoolsScreenDBOperationLoader}
                  onClick={() => saveData(adminIndex)}
                >
                  <Save className="w-4 h-4" />
                  {schoolsScreenDBOperationLoader && <Spinner />}
                </Button>
              )}
              {formik.values.schoolAdmins.length > schoolAdminsMinLimit && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className={"hover:cursor-pointer"}
                  disabled={schoolsScreenDBOperationLoader}
                  onClick={() => removeAdmin(adminIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
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
        {schoolAddressesFormValues.length < schoolAdminsMaxLimit && (
          <Button
            type="button"
            onClick={addAdmin}
            disabled={schoolsScreenDBOperationLoader}
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
        {_.isArray(schoolAddressesFormValues) &&
          _.size(schoolAddressesFormValues) > 0 &&
          _.map(schoolAddressesFormValues, (address, index) =>
            renderAdminForm(index),
          )}

        {schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD && (
          <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {_.upperFirst(
                t("schoolAdminsFormSubmitMessage", {
                  defaultValue: schoolAdminsFormSubmitMessage,
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
              </Button>
              <Button
                type="button"
                variant="outline"
                className="hover:cursor-pointer"
                disabled={schoolsScreenDBOperationLoader}
                onClick={handleCancel}
              >
                {_.upperFirst(
                  t("schoolAdminsFormCancelButtonLabel", {
                    defaultValue: schoolAdminsFormCancelButtonLabel,
                  }),
                )}
              </Button>
            </div>
          </div>
        )}
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
