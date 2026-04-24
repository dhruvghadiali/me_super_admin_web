import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFormik } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import { phoneNumberRegex, aadharCardRegex } from "@MEHelpers/regex";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  SCHOOL_SCREEN_DB_OPERATIONS,
  SELECTION_COMPONENT_VARIANTS,
  ORGANIZATION_MEMBER_POSITION,
} from "@MEHelpers/enums";
import {
  addOrganizationMember,
  removeOrganizationMember,
  setOrganizationMembersFormValues,
  setOrganizationMembersFormValidationStatus,
} from "@MERedux/schools/schoolsSlice";
import {
  emailMaxChar,
  emailMinChar,
  addressMaxChar,
  addressMinChar,
  phoneNumberChar,
  firstNameMaxChar,
  firstNameMinChar,
  lastNameMaxChar,
  lastNameMinChar,
  aadhaarNumberChar,
  organizationMemberPositionMinChar,
  organizationMemberPositionMaxChar,
  organizationMembersMinLimit,
  organizationMembersMaxLimit,
} from "@MEUtils/validationConst";
import {
  emailInvalid,
  cityRequired,
  stateRequired,
  emailRequired,
  emailMaxLength,
  emailMinLength,
  addressRequired,
  zipCodeRequired,
  addressMaxLength,
  addressMinLength,
  districtRequired,
  areaNameRequired,
  phoneNumberLength,
  phoneNumberInvalid,
  phoneNumberRequired,
  firstNameMaxLength,
  firstNameMinLength,
  firstNameRequired,
  lastNameMaxLength,
  lastNameMinLength,
  lastNameRequired,
  aadhaarNumberLength,
  aadhaarNumberInvalid,
  aadhaarNumberRequired,
  organizationMemberPositionRequired,
  organizationMemberPositionMinLength,
  organizationMemberPositionMaxLength,
  organizationMembersMinRequired,
  organizationMembersMaxAllowed,
} from "@MEUtils/validationMessage";
import {
  organizationMemberCardTitle,
  organizationMemberEmailInputLabel,
  organizationMemberAddressInputLabel,
  organizationMemberCitySelectionLabel,
  organizationMemberLastNameInputLabel,
  organizationMembersFormSubmitMessage,
  organizationMemberFirstNameInputLabel,
  organizationMemberStateSelectionLabel,
  organizationMembersFormSaveButtonLabel,
  organizationMembersFormEditButtonLabel,
  organizationMemberZipCodeSelectionLabel,
  organizationMemberEmailInputPlaceholder,
  organizationMemberPhoneNumberInputLabel,
  organizationMembersFormCancelButtonLabel,
  organizationMemberPositionSelectionLabel,
  organizationMemberDistrictSelectionLabel,
  organizationMemberAreaNameSelectionLabel,
  organizationMemberAadhaarNumberInputLabel,
  organizationMemberAddressInputPlaceholder,
  organizationMemberCitySelectionPlaceholder,
  organizationMemberLastNameInputPlaceholder,
  organizationMembersFormAddMemberButtonLabel,
  organizationMemberFirstNameInputPlaceholder,
  organizationMemberStateSelectionPlaceholder,
  organizationMemberPhoneNumberInputPlaceholder,
  organizationMemberZipCodeSelectionPlaceholder,
  organizationMemberAreaNameSelectionPlaceholder,
  organizationMemberDistrictSelectionPlaceholder,
  organizationMemberPositionSelectionPlaceholder,
  organizationMemberAadhaarNumberInputPlaceholder,
} from "@MELocalization/en";

import MEInputComponent from "@MECommonComponents/form/input/meInput";
import MESelectComponent from "@MECommonComponents/form/select/meSelect";

const SchoolScreenOrganizationMembersFormComponent = forwardRef(
  (props, ref) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
      organizationMembersFormValues,
      schoolsScreenDBOperation,
      states,
      schoolsScreenDBOperationLoader,
    } = useSelector((state) => state.schools);

    const changeOrganizationMembersFormValidationStatus = (status) => {
      dispatch(setOrganizationMembersFormValidationStatus(status));
    };

    // Helper function to check if form is valid
    const checkFormValidation = async () => {
      try {
        const errors = await formik.validateForm();
        const hasErrors = Object.keys(errors).length > 0;

        // Check if form has values using formik state (not Redux state)
        const currentFormValues = formik.values.organizationMembers || [];
        const hasValues =
          currentFormValues.length > 0 &&
          currentFormValues.some((member) =>
            Object.values(member || {}).some(
              (value) => value !== null && value !== undefined && value !== "",
            ),
          );

        // Form is valid if no errors and has some values
        const isValid = !hasErrors && hasValues;
        changeOrganizationMembersFormValidationStatus(isValid);
        return isValid;
      } catch (error) {
        console.error("Validation check failed:", error);
        changeOrganizationMembersFormValidationStatus(false);
        return false;
      }
    };

    const formik = useFormik({
      initialValues: {
        organizationMembers: organizationMembersFormValues,
      },
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        const isValid = await checkFormValidation();

        if (isValid) {
          switch (schoolsScreenDBOperation) {
            case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
              changeOrganizationMembersFormValidationStatus(true);
              dispatch(
                setOrganizationMembersFormValues(values.organizationMembers),
              );
              break;
            case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
              changeOrganizationMembersFormValidationStatus(true);
              break;
            default:
              break;
          }
        } else {
          changeOrganizationMembersFormValidationStatus(false);
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
        default:
          break;
      }
    }, [dispatch]);

    // Check validation status when form values, errors, or touched state changes
    useEffect(() => {
      switch (schoolsScreenDBOperation) {
        case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
          dispatch(
            setOrganizationMembersFormValues(formik.values.organizationMembers),
          );
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
            t("organizationMembersFormSaveButtonLabel", {
              defaultValue: organizationMembersFormSaveButtonLabel,
            }),
          );
        case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
          return _.upperFirst(
            t("organizationMembersFormEditButtonLabel", {
              defaultValue: organizationMembersFormEditButtonLabel,
            }),
          );
        default:
          return _.upperFirst(
            t("organizationMembersFormSaveButtonLabel", {
              defaultValue: organizationMembersFormSaveButtonLabel,
            }),
          );
      }
    };

    const addMember = () => dispatch(addOrganizationMember());
    const removeMember = (index) => dispatch(removeOrganizationMember(index));

    // Expose formik methods to parent component
    useImperativeHandle(ref, () => ({
      validateForm: formik.validateForm,
      submitForm: formik.submitForm,
      setTouched: formik.setTouched,
      isValid: formik.isValid,
      errors: formik.errors,
    }));

    const renderMemberForm = (memberIndex) => {
      const memberErrors =
        formik.errors.organizationMembers?.[memberIndex] || {};
      const memberTouched =
        formik.touched.organizationMembers?.[memberIndex] || {};
      const memberValues =
        formik.values.organizationMembers?.[memberIndex] || {};

      return (
        <Card key={memberIndex} className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                {_.upperFirst(
                  t("organizationMemberCardTitle", {
                    defaultValue: organizationMemberCardTitle,
                  }),
                )}
                {formik.values.organizationMembers.length > 1
                  ? ` ${memberIndex + 1}`
                  : ""}
              </CardTitle>
              {formik.values.organizationMembers.length >
                organizationMembersMinLimit &&
                schoolsScreenDBOperation ===
                  SCHOOL_SCREEN_DB_OPERATIONS.ADD && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className={"hover:cursor-pointer"}
                    disabled={schoolsScreenDBOperationLoader}
                    onClick={() => removeMember(memberIndex)}
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
                  t("organizationMemberFirstNameInputLabel", {
                    defaultValue: organizationMemberFirstNameInputLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberFirstNameInputPlaceholder", {
                    defaultValue: organizationMemberFirstNameInputPlaceholder,
                  }),
                )}
                name={`organizationMembers[${memberIndex}].firstName`}
                value={memberValues.firstName || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  memberTouched.firstName && memberErrors.firstName
                    ? memberErrors.firstName
                    : ""
                }
              />

              <MEInputComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberLastNameInputLabel", {
                    defaultValue: organizationMemberLastNameInputLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberLastNameInputPlaceholder", {
                    defaultValue: organizationMemberLastNameInputPlaceholder,
                  }),
                )}
                name={`organizationMembers[${memberIndex}].lastName`}
                value={memberValues.lastName || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  memberTouched.lastName && memberErrors.lastName
                    ? memberErrors.lastName
                    : ""
                }
              />

              <MEInputComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberEmailInputLabel", {
                    defaultValue: organizationMemberEmailInputLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberEmailInputPlaceholder", {
                    defaultValue: organizationMemberEmailInputPlaceholder,
                  }),
                )}
                name={`organizationMembers[${memberIndex}].email`}
                value={memberValues.email || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  memberTouched.email && memberErrors.email
                    ? memberErrors.email
                    : ""
                }
              />

              <MEInputComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberPhoneNumberInputLabel", {
                    defaultValue: organizationMemberPhoneNumberInputLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberPhoneNumberInputPlaceholder", {
                    defaultValue: organizationMemberPhoneNumberInputPlaceholder,
                  }),
                )}
                name={`organizationMembers[${memberIndex}].phoneNumber`}
                value={memberValues.phoneNumber || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  memberTouched.phoneNumber && memberErrors.phoneNumber
                    ? memberErrors.phoneNumber
                    : ""
                }
              />

              <MESelectComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberPositionSelectionLabel", {
                    defaultValue: organizationMemberPositionSelectionLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberPositionSelectionPlaceholder", {
                    defaultValue:
                      organizationMemberPositionSelectionPlaceholder,
                  }),
                )}
                items={_.map(ORGANIZATION_MEMBER_POSITION, (value, key) => ({
                  label: _.startCase(key),
                  value: value,
                }))}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                selectedValue={memberValues.position || ""}
                onValueChange={(value) =>
                  formik.setFieldValue(
                    `organizationMembers[${memberIndex}].position`,
                    value,
                  )
                }
                clearable={true}
                labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
                selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                message={
                  memberTouched.position && memberErrors.position
                    ? memberErrors.position
                    : ""
                }
              />

              <MEInputComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberAadhaarNumberInputLabel", {
                    defaultValue: organizationMemberAadhaarNumberInputLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberAadhaarNumberInputPlaceholder", {
                    defaultValue:
                      organizationMemberAadhaarNumberInputPlaceholder,
                  }),
                )}
                name={`organizationMembers[${memberIndex}].aadhaarNumber`}
                value={memberValues.aadhaarNumber || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  memberTouched.aadhaarNumber && memberErrors.aadhaarNumber
                    ? memberErrors.aadhaarNumber
                    : ""
                }
              />

              <MEInputComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberAddressInputLabel", {
                    defaultValue: organizationMemberAddressInputLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberAddressInputPlaceholder", {
                    defaultValue: organizationMemberAddressInputPlaceholder,
                  }),
                )}
                name={`organizationMembers[${memberIndex}].address`}
                value={memberValues.address || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  memberTouched.address && memberErrors.address
                    ? memberErrors.address
                    : ""
                }
              />

              <MESelectComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberStateSelectionLabel", {
                    defaultValue: organizationMemberStateSelectionLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberStateSelectionPlaceholder", {
                    defaultValue: organizationMemberStateSelectionPlaceholder,
                  }),
                )}
                items={states}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                selectedValue={memberValues.state || ""}
                labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
                selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                onValueChange={(value) =>
                  formik.setFieldValue(
                    `organizationMembers[${memberIndex}].state`,
                    value,
                  )
                }
                clearable={true}
                message={
                  memberTouched.state && memberErrors.state
                    ? memberErrors.state
                    : ""
                }
              />

              <MESelectComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberDistrictSelectionLabel", {
                    defaultValue: organizationMemberDistrictSelectionLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberDistrictSelectionPlaceholder", {
                    defaultValue:
                      organizationMemberDistrictSelectionPlaceholder,
                  }),
                )}
                items={
                  _.find(states, {
                    value: memberValues.state,
                  })?.districts || []
                }
                selectedValue={memberValues.district || ""}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                onValueChange={(value) =>
                  formik.setFieldValue(
                    `organizationMembers[${memberIndex}].district`,
                    value,
                  )
                }
                clearable={true}
                labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
                selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                message={
                  memberTouched.district && memberErrors.district
                    ? memberErrors.district
                    : ""
                }
              />

              <MESelectComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberCitySelectionLabel", {
                    defaultValue: organizationMemberCitySelectionLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberCitySelectionPlaceholder", {
                    defaultValue: organizationMemberCitySelectionPlaceholder,
                  }),
                )}
                items={
                  _.find(
                    _.find(states, {
                      value: memberValues.state,
                    })?.districts || [],
                    {
                      value: memberValues.district,
                    },
                  )?.cities || []
                }
                selectedValue={memberValues.city || ""}
                onValueChange={(value) =>
                  formik.setFieldValue(
                    `organizationMembers[${memberIndex}].city`,
                    value,
                  )
                }
                clearable={true}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
                selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                message={
                  memberTouched.city && memberErrors.city
                    ? memberErrors.city
                    : ""
                }
              />

              <MESelectComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberAreaNameSelectionLabel", {
                    defaultValue: organizationMemberAreaNameSelectionLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberAreaNameSelectionPlaceholder", {
                    defaultValue:
                      organizationMemberAreaNameSelectionPlaceholder,
                  }),
                )}
                items={
                  _.find(
                    _.find(
                      _.find(states, {
                        value: memberValues?.state,
                      })?.districts || [],
                      {
                        value: memberValues?.district,
                      },
                    )?.cities || [],
                    {
                      value: memberValues?.city,
                    },
                  )?.areaNames || []
                }
                selectedValue={memberValues?.areaName || ""}
                onValueChange={(value) =>
                  formik.setFieldValue(
                    `organizationMembers[${memberIndex}].areaName`,
                    value,
                  )
                }
                clearable={true}
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
                selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                message={
                  memberTouched.areaName && memberErrors.areaName
                    ? memberErrors.areaName
                    : ""
                }
              />

              <MESelectComponent
                required={true}
                label={_.upperFirst(
                  t("organizationMemberZipCodeSelectionLabel", {
                    defaultValue: organizationMemberZipCodeSelectionLabel,
                  }),
                )}
                placeholder={_.upperFirst(
                  t("organizationMemberZipCodeSelectionPlaceholder", {
                    defaultValue: organizationMemberZipCodeSelectionPlaceholder,
                  }),
                )}
                items={
                  _.find(
                    _.find(
                      _.find(
                        _.find(states, { value: memberValues?.state })
                          ?.districts || [],
                        { value: memberValues?.district },
                      )?.cities || [],
                      { value: memberValues?.city },
                    )?.areaNames || [],
                    { value: memberValues?.areaName },
                  )?.zipcodes || []
                }
                disabled={
                  schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.EDIT
                }
                selectedValue={memberValues?.zipcode || ""}
                onValueChange={(value) =>
                  formik.setFieldValue(
                    `organizationMembers[${memberIndex}].zipcode`,
                    value,
                  )
                }
                clearable={true}
                labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
                selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
                message={
                  memberTouched.zipcode && memberErrors.zipcode
                    ? memberErrors.zipcode
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
          {schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD
            ? organizationMembersFormValues.length <
                organizationMembersMaxLimit && (
                <Button
                  type="button"
                  onClick={addMember}
                  disabled={schoolsScreenDBOperationLoader}
                  className="flex items-center gap-2 hover:cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {_.upperFirst(
                    t("organizationMembersFormAddMemberButtonLabel", {
                      defaultValue: organizationMembersFormAddMemberButtonLabel,
                    }),
                  )}
                </Button>
              )
            : null}
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {_.isArray(organizationMembersFormValues) &&
            _.size(organizationMembersFormValues) > 0 &&
            _.map(organizationMembersFormValues, (member, index) =>
              renderMemberForm(index),
            )}

          {schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD && (
            <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {_.upperFirst(
                  t("organizationMembersFormSubmitMessage", {
                    defaultValue: organizationMembersFormSubmitMessage,
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
                    t("organizationMembersFormCancelButtonLabel", {
                      defaultValue: organizationMembersFormCancelButtonLabel,
                    }),
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </>
    );
  },
);

const validationSchema = Yup.object({
  organizationMembers: Yup.array()
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
        position: Yup.string()
          .trim()
          .min(
            organizationMemberPositionMinChar,
            organizationMemberPositionMinLength,
          )
          .max(
            organizationMemberPositionMaxChar,
            organizationMemberPositionMaxLength,
          )
          .required(organizationMemberPositionRequired),
        aadhaarNumber: Yup.string()
          .trim()
          .matches(aadharCardRegex, aadhaarNumberInvalid)
          .min(aadhaarNumberChar, aadhaarNumberLength)
          .max(aadhaarNumberChar, aadhaarNumberLength)
          .required(aadhaarNumberRequired),
        address: Yup.string()
          .trim()
          .min(addressMinChar, addressMinLength)
          .max(addressMaxChar, addressMaxLength)
          .required(addressRequired),
        state: Yup.string().trim().required(stateRequired),
        district: Yup.string().trim().required(districtRequired),
        city: Yup.string().trim().required(cityRequired),
        areaName: Yup.string().trim().required(areaNameRequired),
        zipcode: Yup.string().trim().required(zipCodeRequired),
      }),
    )
    .min(organizationMembersMinLimit, organizationMembersMinRequired)
    .max(organizationMembersMaxLimit, organizationMembersMaxAllowed)
    .required(),
});

export default SchoolScreenOrganizationMembersFormComponent;
