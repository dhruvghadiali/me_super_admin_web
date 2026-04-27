import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { useFormik } from "formik";
import { Plus, Trash2, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import {
  editSchoolAddress,
  addSchoolAddress,
} from "@MERedux/schools/schoolsAction";
import {
  setEditSchoolAddressAPIPayload,
  setAddSchoolAddressAPIPaylod,
} from "@MEUtils/apiPayload";
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
  setFormHasError,
  addSchoolAddressForm,
  removeSchoolAddress,
  setSchoolAddressesFormValues,
  setSchoolAddressesFormValidationStatus,
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
  const {
    schoolAddressesFormValues,
    schoolsScreenDBOperation,
    states,
    schoolsScreenDBOperationLoader,
    isSchoolAddressesFormValid,
    isSchoolAdminsFormValidated,
    schoolFormValues,
  } = useSelector((state) => state.schools);

  const changeSchoolAddressesFormValidationStatus = (status) => {
    dispatch(setSchoolAddressesFormValidationStatus(status));
  };

  // Helper function to check if form is valid
  const checkFormValidation = async () => {
    try {
      const errors = await formik.validateForm();
      const hasErrors = Object.keys(errors).length > 0;

      // Check if form has values using formik state (not Redux state)
      const currentFormValues = formik.values.schoolAddresses || [];
      const hasValues =
        currentFormValues.length > 0 &&
        currentFormValues.some((address) =>
          Object.values(address || {}).some(
            (value) => value !== null && value !== undefined && value !== "",
          ),
        );

      // Form is valid if no errors and has some values
      const isValid = !hasErrors && hasValues;
      changeSchoolAddressesFormValidationStatus(isValid);
      return isValid;
    } catch (error) {
      console.error("Validation check failed:", error);
      changeSchoolAddressesFormValidationStatus(false);
      return false;
    }
  };

  const setFormValuesToRedux = (schoolAddresses) => {
    dispatch(setSchoolAddressesFormValues(schoolAddresses));
  };

  const formik = useFormik({
    initialValues: {
      schoolAddresses: schoolAddressesFormValues,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const isValid = await checkFormValidation();

      if (isValid) {
        switch (schoolsScreenDBOperation) {
          case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
            changeSchoolAddressesFormValidationStatus(true);
            setFormValuesToRedux(values.schoolAddresses);
            break;
          case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
            changeSchoolAddressesFormValidationStatus(true);
            break;
          default:
            break;
        }
      } else {
        changeSchoolAddressesFormValidationStatus(false);
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
    setFormValuesToRedux(formik.values.schoolAddresses);
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

  const addAddress = () => dispatch(addSchoolAddressForm());
  const removeAddress = (index) => dispatch(removeSchoolAddress(index));

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
       switch (_.get(formik.values.schoolAddresses[index], "dbOperation", "")) {
        case SCHOOL_SCREEN_DB_OPERATIONS.EDIT:
          dispatch(
            editSchoolAddress(
              setEditSchoolAddressAPIPayload(
                formik.values.schoolAddresses[index],
              ),
            ),
          );
          break;
        case SCHOOL_SCREEN_DB_OPERATIONS.ADD:
          if (isSchoolAddressesFormValid && isSchoolAdminsFormValidated) {
            dispatch(
              addSchoolAddress(
                setAddSchoolAddressAPIPaylod({
                  ...formik.values.schoolAddresses[index],
                  schoolId: schoolFormValues.id,
                }),
              ),
            );
            dispatch(setFormHasError(false));
          } else {
            dispatch(setFormHasError(true));
          }
          break;
        default:
          break;
      }
    } else {
      await formik.validateForm();

      // Set all school address fields as touched to display errors
      const touchedState = {
        schoolAddresses: _.map(formik.values.schoolAddresses, () => ({
          address: true,
          state: true,
          district: true,
          city: true,
          areaName: true,
          zipcode: true,
        })),
      };

      formik.setTouched(touchedState);
    }
  };

  const renderAddressForm = (addressIndex) => {
    const addressErrors = formik.errors.schoolAddresses?.[addressIndex] || {};
    const addressTouched = formik.touched.schoolAddresses?.[addressIndex] || {};
    const addressValues = formik.values.schoolAddresses?.[addressIndex] || {};
    const adminFirstName = _.upperCase(
      _.get(
        schoolAddressesFormValues,
        `[${addressIndex}].schoolAdmin.firstName`,
        "",
      ),
    );
    const adminLastName = _.upperCase(
      _.get(
        schoolAddressesFormValues,
        `[${addressIndex}].schoolAdmin.lastName`,
        "",
      ),
    );

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
              <p className="text-xs">{`(${adminFirstName} ${adminLastName})`}</p>
            </CardTitle>
            <div className="flex gap-x-2.5">
              {schoolsScreenDBOperation ===
                SCHOOL_SCREEN_DB_OPERATIONS.EDIT && (
                <Button
                  type="button"
                  size="sm"
                  className={"hover:cursor-pointer"}
                  disabled={schoolsScreenDBOperationLoader}
                  onClick={() => saveData(addressIndex)}
                >
                  <Save className="w-4 h-4" />
                </Button>
              )}
              {formik.values.schoolAddresses.length >
                schoolAddressesMinLimit && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className={"hover:cursor-pointer"}
                  disabled={schoolsScreenDBOperationLoader}
                  onClick={() => removeAddress(addressIndex)}
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
              value={addressValues.address || ""}
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
              items={states}
              selectedValue={addressValues.state || ""}
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
              items={
                _.find(states, {
                  value: addressValues.state,
                })?.districts || []
              }
              selectedValue={addressValues.district || ""}
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
              items={
                _.find(
                  _.find(states, {
                    value: addressValues.state,
                  })?.districts || [],
                  {
                    value: addressValues.district,
                  },
                )?.cities || []
              }
              selectedValue={addressValues.city || ""}
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
              items={
                _.find(
                  _.find(
                    _.find(states, {
                      value: addressValues?.state,
                    })?.districts || [],
                    {
                      value: addressValues?.district,
                    },
                  )?.cities || [],
                  {
                    value: addressValues?.city,
                  },
                )?.areaNames || []
              }
              selectedValue={addressValues?.areaName || ""}
              onValueChange={(value) =>
                formik.setFieldValue(
                  `schoolAddresses[${addressIndex}].areaName`,
                  value,
                )
              }
              clearable={true}
              labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              messagevariant={SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE}
              selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
              message={
                addressTouched.areaName && addressErrors.areaName
                  ? addressErrors.areaName
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
              items={
                _.find(
                  _.find(
                    _.find(
                      _.find(states, { value: addressValues?.state })
                        ?.districts || [],
                      { value: addressValues?.district },
                    )?.cities || [],
                    { value: addressValues?.city },
                  )?.areaNames || [],
                  { value: addressValues?.areaName },
                )?.zipcodes || []
              }
              selectedValue={addressValues?.zipcode || ""}
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
            disabled={schoolsScreenDBOperationLoader}
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
        {_.isArray(schoolAddressesFormValues) &&
          _.size(schoolAddressesFormValues) > 0 &&
          _.map(schoolAddressesFormValues, (address, index) =>
            renderAddressForm(index),
          )}

        {schoolsScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD && (
          <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {_.upperFirst(
                t("schoolAddressesFormSubmitMessage", {
                  defaultValue: schoolAddressesFormSubmitMessage,
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
                  t("schoolAddressesFormCancelButtonLabel", {
                    defaultValue: schoolAddressesFormCancelButtonLabel,
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
        areaName: Yup.string().trim().required(areaNameRequired),
        zipcode: Yup.string().trim().required(zipCodeRequired),
      }),
    )
    .min(schoolAddressesMinLimit, schoolAddressesMinRequired)
    .max(schoolAddressesMaxLimit, schoolAddressesMaxAllowed)
    .required(),
});

export default SchoolScreenSchoolAddressesFormComponent;
