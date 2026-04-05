import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  SELECTION_COMPONENT_VARIANTS,
  SCHOOL_SCREEN_DB_OPERATIONS,
} from "@MEHelpers/enums";
import {
  addSchoolAddress,
  removeSchoolAddress,
  setSchoolAddressesFormValues,
} from "@MERedux/schools/schoolsSlice";
import {
  addressMaxChar,
  addressMinChar,
  schoolAddressesMinLimit,
  schoolAddressesMaxLimit,
} from "@MEUtils/validationConst";
import {
  cityRequired,
  stateRequired,
  addressRequired,
  zipCodeRequired,
  addressMaxLength,
  addressMinLength,
  districtRequired,
  areaNameRequired,
  schoolAddressesMinRequired,
  schoolAddressesMaxAllowed,
} from "@MEUtils/validationMessage";
import {
  schoolAddressCardTitle,
  schoolAddressAddressInputLabel,
  schoolAddressStateSelectionLabel,
  schoolAddressDistrictSelectionLabel,
  schoolAddressCitySelectionLabel,
  schoolAddressAreaNameSelectionLabel,
  schoolAddressZipCodeInputLabel,
  schoolAddressAddressInputPlaceholder,
  schoolAddressStateSelectionPlaceholder,
  schoolAddressDistrictSelectionPlaceholder,
  schoolAddressCitySelectionPlaceholder,
  schoolAddressAreaNameSelectionPlaceholder,
  schoolAddressZipCodeInputPlaceholder,
  schoolAddressesFormSaveButtonLabel,
  schoolAddressesFormEditButtonLabel,
  schoolAddressesFormCancelButtonLabel,
  schoolAddressesFormAddAddressButtonLabel,
  schoolAddressesFormSubmitMessage,
} from "@MELocalization/en";

import MEInputComponent from "@MECommonComponents/form/input/meInput";
import MESelectComponent from "@MECommonComponents/form/select/meSelect";

const SchoolScreenSchoolAddressesFormComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { schoolAddressesFormValues, schoolScreenDBOperation } = useSelector(
    (state) => state.schools,
  );

  const formik = useFormik({
    initialValues: {
      schoolAddresses: schoolAddressesFormValues,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      switch (schoolScreenDBOperation) {
        case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
          dispatch(setSchoolAddressesFormValues(values.schoolAddresses));
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
          t("schoolAddressesFormSaveButtonLabel", {
            defaultValue: schoolAddressesFormSaveButtonLabel,
          }),
        );
      case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
        return _.upperFirst(
          t("schoolAddressesFormEditButtonLabel", {
            defaultValue: schoolAddressesFormEditButtonLabel,
          }),
        );
      default:
        return _.upperFirst(
          t("schoolAddressesFormSaveButtonLabel", {
            defaultValue: schoolAddressesFormSaveButtonLabel,
          }),
        );
    }
  };

  const addAddress = () => dispatch(addSchoolAddress());
  const removeAddress = (index) => dispatch(removeSchoolAddress(index));

  // Expose formik methods to parent component
  useImperativeHandle(ref, () => ({
    validateForm: formik.validateForm,
    submitForm: formik.submitForm,
    setTouched: formik.setTouched,
    isValid: formik.isValid,
    errors: formik.errors,
  }));

  const renderAddressForm = (addressIndex) => {
    const addressErrors = formik.errors.schoolAddresses?.[addressIndex] || {};
    const addressTouched = formik.touched.schoolAddresses?.[addressIndex] || {};

    return (
      <Card key={addressIndex} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              {_.upperFirst(
                t("schoolAddressCardTitle", {
                  defaultValue: schoolAddressCardTitle,
                }),
              )}
              {formik.values.schoolAddresses.length > 1
                ? ` ${addressIndex + 1}`
                : ""}
            </CardTitle>
            {formik.values.schoolAddresses.length > schoolAddressesMinLimit && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className={"hover:cursor-pointer"}
                onClick={() => removeAddress(addressIndex)}
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
                t("schoolAddressAddressInputLabel", {
                  defaultValue: schoolAddressAddressInputLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAddressAddressInputPlaceholder", {
                  defaultValue: schoolAddressAddressInputPlaceholder,
                }),
              )}
              name={`schoolAddresses[${addressIndex}].address`}
              value={formik.values.schoolAddresses[addressIndex]?.address || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={
                addressTouched.address && addressErrors.address
                  ? addressErrors.address
                  : ""
              }
            />

            <MESelectComponent
              required={true}
              label={_.upperFirst(
                t("schoolAddressStateSelectionLabel", {
                  defaultValue: schoolAddressStateSelectionLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAddressStateSelectionPlaceholder", {
                  defaultValue: schoolAddressStateSelectionPlaceholder,
                }),
              )}
              items={[
                { value: "Maharashtra", label: "Maharashtra" },
                { value: "Gujarat", label: "Gujarat" },
                { value: "Karnataka", label: "Karnataka" },
                { value: "Tamil Nadu", label: "Tamil Nadu" },
                { value: "Rajasthan", label: "Rajasthan" },
              ]}
              selectedValue={
                formik.values.schoolAddresses[addressIndex]?.state || ""
              }
              onValueChange={(value) =>
                formik.setFieldValue(
                  `schoolAddresses[${addressIndex}].state`,
                  value,
                )
              }
              clearable={true}
              labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
              selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              message={
                addressTouched.state && addressErrors.state
                  ? addressErrors.state
                  : ""
              }
            />

            <MESelectComponent
              required={true}
              label={_.upperFirst(
                t("schoolAddressDistrictSelectionLabel", {
                  defaultValue: schoolAddressDistrictSelectionLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAddressDistrictSelectionPlaceholder", {
                  defaultValue: schoolAddressDistrictSelectionPlaceholder,
                }),
              )}
              items={[
                { value: "Pune", label: "Pune" },
                { value: "Mumbai", label: "Mumbai" },
                { value: "Nashik", label: "Nashik" },
                { value: "Nagpur", label: "Nagpur" },
                { value: "Aurangabad", label: "Aurangabad" },
              ]}
              selectedValue={
                formik.values.schoolAddresses[addressIndex]?.district || ""
              }
              onValueChange={(value) =>
                formik.setFieldValue(
                  `schoolAddresses[${addressIndex}].district`,
                  value,
                )
              }
              clearable={true}
              labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
              selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              message={
                addressTouched.district && addressErrors.district
                  ? addressErrors.district
                  : ""
              }
            />

            <MESelectComponent
              required={true}
              label={_.upperFirst(
                t("schoolAddressCitySelectionLabel", {
                  defaultValue: schoolAddressCitySelectionLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAddressCitySelectionPlaceholder", {
                  defaultValue: schoolAddressCitySelectionPlaceholder,
                }),
              )}
              items={[
                { value: "Pune City", label: "Pune City" },
                { value: "Pimpri-Chinchwad", label: "Pimpri-Chinchwad" },
                { value: "Wagholi", label: "Wagholi" },
                { value: "Hadapsar", label: "Hadapsar" },
                { value: "Kothrud", label: "Kothrud" },
              ]}
              selectedValue={
                formik.values.schoolAddresses[addressIndex]?.city || ""
              }
              onValueChange={(value) =>
                formik.setFieldValue(
                  `schoolAddresses[${addressIndex}].city`,
                  value,
                )
              }
              clearable={true}
              labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
              selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              message={
                addressTouched.city && addressErrors.city
                  ? addressErrors.city
                  : ""
              }
            />

            <MESelectComponent
              required={true}
              label={_.upperFirst(
                t("schoolAddressAreaNameSelectionLabel", {
                  defaultValue: schoolAddressAreaNameSelectionLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAddressAreaNameSelectionPlaceholder", {
                  defaultValue: schoolAddressAreaNameSelectionPlaceholder,
                }),
              )}
              items={[
                { value: "Baner", label: "Baner" },
                { value: "Aundh", label: "Aundh" },
                { value: "Hinjewadi", label: "Hinjewadi" },
                { value: "Koregaon Park", label: "Koregaon Park" },
                { value: "Viman Nagar", label: "Viman Nagar" },
              ]}
              selectedValue={
                formik.values.schoolAddresses[addressIndex]?.area_name || ""
              }
              onValueChange={(value) =>
                formik.setFieldValue(
                  `schoolAddresses[${addressIndex}].area_name`,
                  value,
                )
              }
              clearable={true}
              labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
              selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              message={
                addressTouched.area_name && addressErrors.area_name
                  ? addressErrors.area_name
                  : ""
              }
            />

            <MESelectComponent
              required={true}
              label={_.upperFirst(
                t("schoolAddressZipCodeInputLabel", {
                  defaultValue: schoolAddressZipCodeInputLabel,
                }),
              )}
              placeholder={_.upperFirst(
                t("schoolAddressZipCodeInputPlaceholder", {
                  defaultValue: schoolAddressZipCodeInputPlaceholder,
                }),
              )}
              items={[
                { value: "411001", label: "411001" },
                { value: "411002", label: "411002" },
                { value: "411003", label: "411003" },
                { value: "411004", label: "411004" },
                { value: "411005", label: "411005" },
              ]}
              selectedValue={
                formik.values.schoolAddresses[addressIndex]?.zipcode || ""
              }
              onValueChange={(value) =>
                formik.setFieldValue(
                  `schoolAddresses[${addressIndex}].zipcode`,
                  value,
                )
              }
              clearable={true}
              labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
              selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              message={
                addressTouched.zipcode && addressErrors.zipcode
                  ? addressErrors.zipcode
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
        {schoolAddressesFormValues.length < schoolAddressesMaxLimit && (
          <Button
            type="button"
            onClick={addAddress}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {_.upperFirst(
              t("schoolAddressesFormAddAddressButtonLabel", {
                defaultValue: schoolAddressesFormAddAddressButtonLabel,
              }),
            )}
          </Button>
        )}
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {schoolAddressesFormValues.map((_, index) => renderAddressForm(index))}

        <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {_.upperFirst(
              t("schoolAddressesFormSubmitMessage", {
                defaultValue: schoolAddressesFormSubmitMessage,
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
                t("schoolAddressesFormCancelButtonLabel", {
                  defaultValue: schoolAddressesFormCancelButtonLabel,
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
  schoolAddresses: Yup.array()
    .of(
      Yup.object({
        address: Yup.string()
          .trim()
          .min(addressMinChar, addressMinLength)
          .max(addressMaxChar, addressMaxLength)
          .required(addressRequired),
        state: Yup.string().trim().required(stateRequired),
        district: Yup.string().trim().required(districtRequired),
        city: Yup.string().trim().required(cityRequired),
        area_name: Yup.string().trim().required(areaNameRequired),
        zipcode: Yup.string().trim().required(zipCodeRequired),
      }),
    )
    .min(schoolAddressesMinLimit, schoolAddressesMinRequired)
    .max(schoolAddressesMaxLimit, schoolAddressesMaxAllowed)
    .required(),
});

export default SchoolScreenSchoolAddressesFormComponent;
