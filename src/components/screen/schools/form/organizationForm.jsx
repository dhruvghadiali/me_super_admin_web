import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import {
  SELECTION_COMPONENT_VARIANTS,
  SCHOOL_FORM_OPERATION_STATES,
} from "@MEHelpers/enums";
import { phoneNumberRegex } from "@MEHelpers/regex";
import {
  emailMaxChar,
  emailMinChar,
  addressMaxChar,
  addressMinChar,
  phoneNumberChar,
  organizationNameMaxChar,
  organizationNameMinChar,
  organizationShortNameMaxChar,
  organizationShortNameMinChar,
  governmentRegistrationNumberMaxChar,
  governmentRegistrationNumberMinChar,
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
  organizationNameRequired,
  organizationNameMaxLength,
  organizationNameMinLength,
  organizationShortNameRequired,
  organizationShortNameMaxLength,
  organizationShortNameMinLength,
  governmentRegistrationNumberRequired,
  governmentRegistrationNumberMaxLength,
  governmentRegistrationNumberMinLength,
} from "@MEUtils/validationMessage";
import {
  organizationFormNameInputLabel,
  organizationFormNameInputPlaceholder,
  organizationFormShortNameInputLabel,
  organizationFormShortNameInputPlaceholder,
  organizationFormEmailInputLabel,
  organizationFormEmailInputPlaceholder,
  organizationFormPhoneNumberInputLabel,
  organizationFormPhoneNumberInputPlaceholder,
  organizationFormGovernmentRegisterNumberInputLabel,
  organizationFormGovernmentRegisterNumberInputPlaceholder,
  organizationFormAddressInputLabel,
  organizationFormAddressInputPlaceholder,
  organizationFormStateSelectionLabel,
  organizationFormStateSelectionPlaceholder,
  organizationFormDistrictSelectionLabel,
  organizationFormDistrictSelectionPlaceholder,
  organizationFormCitySelectionLabel,
  organizationFormCitySelectionPlaceholder,
  organizationFormAreaNameSelectionLabel,
  organizationFormAreaNameSelectionPlaceholder,
  organizationFormZipCodeSelectionLabel,
  organizationFormZipCodeSelectionPlaceholder,
  organizationFormSaveButtonLabel,
  organizationFormEditButtonLabel,
  organizationFormCancelButtonLabel,
  organizationFormSubmitMessage,
} from "@MELocalization/en";

import MEInputComponent from "@MECommonComponents/form/input/meInput";
import MESelectComponent from "@MECommonComponents/form/select/meSelect";

const SchoolScreenOrganizationFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { organizationFormValues, schoolFormOperationState } = useSelector(
    (state) => state.schools,
  );

  const formik = useFormik({
    initialValues: organizationFormValues,
    validationSchema,
    onSubmit: (values) => {
      switch (schoolFormOperationState) {
        case SCHOOL_FORM_OPERATION_STATES.ADD:
          dispatch(setOrganizationFormValues(values));
          break;
        case SCHOOL_FORM_OPERATION_STATES.EDIT:
          // Dispatch edit organization action
          break;
        default:
          break;
      }
    },
  });

  const submitButtonText = () => {
    switch (schoolFormOperationState) {
      case SCHOOL_FORM_OPERATION_STATES.ADD:
        return _.upperFirst(
          t("organizationFormSaveButtonLabel", {
            defaultValue: organizationFormSaveButtonLabel,
          }),
        );
      case SCHOOL_FORM_OPERATION_STATES.EDIT:
        return _.upperFirst(
          t("organizationFormEditButtonLabel", {
            defaultValue: organizationFormEditButtonLabel,
          }),
        );
      default:
        return _.upperFirst(
          t("organizationFormSaveButtonLabel", {
            defaultValue: organizationFormSaveButtonLabel,
          }),
        );
    }
  };

  console.log("formik values", formik.values, organizationFormValues);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-6 p-2">
        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("organizationFormNameInputLabel", {
              defaultValue: organizationFormNameInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormNameInputPlaceholder", {
              defaultValue: organizationFormNameInputPlaceholder,
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
            t("organizationFormShortNameInputLabel", {
              defaultValue: organizationFormShortNameInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormShortNameInputPlaceholder", {
              defaultValue: organizationFormShortNameInputPlaceholder,
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
            t("organizationFormEmailInputLabel", {
              defaultValue: organizationFormEmailInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormEmailInputPlaceholder", {
              defaultValue: organizationFormEmailInputPlaceholder,
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
            t("organizationFormPhoneNumberInputLabel", {
              defaultValue: organizationFormPhoneNumberInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormPhoneNumberInputPlaceholder", {
              defaultValue: organizationFormPhoneNumberInputPlaceholder,
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
            t("organizationFormGovernmentRegisterNumberInputLabel", {
              defaultValue: organizationFormGovernmentRegisterNumberInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormGovernmentRegisterNumberInputPlaceholder", {
              defaultValue:
                organizationFormGovernmentRegisterNumberInputPlaceholder,
            }),
          )}
          name={"governmentRegisterNumber"}
          value={formik.values.governmentRegisterNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.governmentRegisterNumber &&
            formik.errors.governmentRegisterNumber
              ? formik.errors.governmentRegisterNumber
              : ""
          }
        />
        <MEInputComponent
          required={true}
          label={_.upperFirst(
            t("organizationFormAddressInputLabel", {
              defaultValue: organizationFormAddressInputLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormAddressInputPlaceholder", {
              defaultValue: organizationFormAddressInputPlaceholder,
            }),
          )}
          name={"address"}
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.touched.address && formik.errors.address
              ? formik.errors.address
              : ""
          }
        />
        <MESelectComponent
          disabled={false}
          required={true}
          clearable={true}
          label={_.upperFirst(
            t("organizationFormStateSelectionLabel", {
              defaultValue: organizationFormStateSelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormStateSelectionPlaceholder", {
              defaultValue: organizationFormStateSelectionPlaceholder,
            }),
          )}
          name={"state"}
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message={
            formik.touched.state && formik.errors.state
              ? formik.errors.state
              : ""
          }
          selectedValue={formik.values.state}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => formik.setFieldValue("state", value)}
          onBlur={formik.handleBlur}
        />
        <MESelectComponent
          required={true}
          disabled={false}
          clearable={true}
          label={_.upperFirst(
            t("organizationFormDistrictSelectionLabel", {
              defaultValue: organizationFormDistrictSelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormDistrictSelectionPlaceholder", {
              defaultValue: organizationFormDistrictSelectionPlaceholder,
            }),
          )}
          name={"district"}
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message={
            formik.touched.district && formik.errors.district
              ? formik.errors.district
              : ""
          }
          selectedValue={formik.values.district}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => formik.setFieldValue("district", value)}
          onBlur={formik.handleBlur}
        />
        <MESelectComponent
          required={true}
          disabled={false}
          clearable={true}
          label={_.upperFirst(
            t("organizationFormCitySelectionLabel", {
              defaultValue: organizationFormCitySelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormCitySelectionPlaceholder", {
              defaultValue: organizationFormCitySelectionPlaceholder,
            }),
          )}
          name={"city"}
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message={
            formik.touched.city && formik.errors.city ? formik.errors.city : ""
          }
          selectedValue={formik.values.city}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => formik.setFieldValue("city", value)}
          onBlur={formik.handleBlur}
        />
        <MESelectComponent
          required={true}
          disabled={false}
          clearable={true}
          label={_.upperFirst(
            t("organizationFormAreaNameSelectionLabel", {
              defaultValue: organizationFormAreaNameSelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormAreaNameSelectionPlaceholder", {
              defaultValue: organizationFormAreaNameSelectionPlaceholder,
            }),
          )}
          name={"areaName"}
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message={
            formik.touched.areaName && formik.errors.areaName
              ? formik.errors.areaName
              : ""
          }
          selectedValue={formik.values.areaName}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => formik.setFieldValue("areaName", value)}
          onBlur={formik.handleBlur}
        />
        <MESelectComponent
          required={true}
          disabled={false}
          clearable={true}
          label={_.upperFirst(
            t("organizationFormZipCodeSelectionLabel", {
              defaultValue: organizationFormZipCodeSelectionLabel,
            }),
          )}
          placeholder={_.upperFirst(
            t("organizationFormZipCodeSelectionPlaceholder", {
              defaultValue: organizationFormZipCodeSelectionPlaceholder,
            }),
          )}
          name={"zipCode"}
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message={
            formik.touched.zipCode && formik.errors.zipCode
              ? formik.errors.zipCode
              : ""
          }
          selectedValue={formik.values.zipCode}
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => formik.setFieldValue("zipCode", value)}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {_.upperFirst(
            t("organizationFormSubmitMessage", {
              defaultValue: organizationFormSubmitMessage,
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
              t("organizationFormCancelButtonLabel", {
                defaultValue: organizationFormCancelButtonLabel,
              }),
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(organizationNameMinChar, organizationNameMinLength)
    .max(organizationNameMaxChar, organizationNameMaxLength)
    .required(organizationNameRequired),
  shortName: Yup.string()
    .trim()
    .min(organizationShortNameMinChar, organizationShortNameMinLength)
    .max(organizationShortNameMaxChar, organizationShortNameMaxLength)
    .required(organizationShortNameRequired),
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
  governmentRegisterNumber: Yup.string()
    .trim()
    .min(
      governmentRegistrationNumberMinChar,
      governmentRegistrationNumberMinLength,
    )
    .max(
      governmentRegistrationNumberMaxChar,
      governmentRegistrationNumberMaxLength,
    )
    .required(governmentRegistrationNumberRequired),
  address: Yup.string()
    .min(addressMinChar, addressMinLength)
    .max(addressMaxChar, addressMaxLength)
    .required(addressRequired),
  state: Yup.string().trim().required(stateRequired),
  district: Yup.string().trim().required(districtRequired),
  city: Yup.string().trim().required(cityRequired),
  areaName: Yup.string().trim().required(areaNameRequired),
  zipCode: Yup.string().trim().required(zipCodeRequired),
});

export default SchoolScreenOrganizationFormComponent;
