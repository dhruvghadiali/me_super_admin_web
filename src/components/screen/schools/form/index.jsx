import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  School,
  UsersIcon,
  MapPinnedIcon,
  LucideBuilding2,
} from "lucide-react";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import { SCHOOL_FORM_ACCORDION_ITEMS } from "@MEHelpers/enums";
import { setAddSchoolFormHasError } from "@MERedux/schools/schoolsSlice";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@MEShadcnComponents/accordion";
import {
  organizationAccordionTitle,
  organizationAccordionSubtitle,
  organizationMembersAccordionTitle,
  organizationMembersAccordionSubtitle,
  schoolAccordionTitle,
  schoolAccordionSubtitle,
  schoolAddressesAccordionTitle,
  schoolAddressesAccordionSubtitle,
  schoolAdminsAccordionTitle,
  schoolAdminsAccordionSubtitle,
} from "@MELocalization/en";

import SchoolScreenSchoolFormComponent from "@MEScreenComponents/schools/form/schoolForm";
import SchoolScreenOrganizationFormComponent from "@MEScreenComponents/schools/form/organizationForm";
import SchoolScreenSchoolAdminsFormComponent from "@MEScreenComponents/schools/form/schoolAdminsForm";
import SchoolScreenSchoolAddressesFormComponent from "@MEScreenComponents/schools/form/schoolAddressesForm";
import SchoolScreenOrganizationMembersFormComponent from "@MEScreenComponents/schools/form/organizationMembersForm";

const SchoolScreenFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { addSchoolFormHasError } = useSelector((state) => state.schools);

  useEffect(() => {
    return () => {
      // Clear timeout and reset error state on cleanup
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      dispatch(setAddSchoolFormHasError(false));
    };
  }, [dispatch]);

  // Refs for each form component
  const schoolFormRef = useRef(null);
  const schoolAdminsFormRef = useRef(null);
  const organizationFormRef = useRef(null);
  const schoolAddressesFormRef = useRef(null);
  const organizationMembersFormRef = useRef(null);

  // Timeout ref for auto-clearing error state
  const errorTimeoutRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const formValidations = await Promise.all([
        organizationFormRef.current?.validateForm().catch(() => ({})) || {},
        organizationMembersFormRef.current?.validateForm().catch(() => ({})) ||
          {},
        schoolFormRef.current?.validateForm().catch(() => ({})) || {},
        schoolAddressesFormRef.current?.validateForm().catch(() => ({})) || {},
        schoolAdminsFormRef.current?.validateForm().catch(() => ({})) || {},
      ]);

      const hasErrors = formValidations.some(
        (errors) => errors && Object.keys(errors).length > 0,
      );

      if (hasErrors) {
        setTimeout(() => {
          // Clear any existing timeout
          if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
          }

          dispatch(setAddSchoolFormHasError(true));

          // Auto-clear error after 5 seconds
          errorTimeoutRef.current = setTimeout(() => {
            dispatch(setAddSchoolFormHasError(false));
          }, 5000);

          organizationFormRef.current?.setTouched(
            setNestedObjectValues(formValidations[0], true),
          );
          organizationMembersFormRef.current?.setTouched(
            setNestedObjectValues(formValidations[1], true),
          );
          schoolFormRef.current?.setTouched(
            setNestedObjectValues(formValidations[2], true),
          );
          schoolAddressesFormRef.current?.setTouched(
            setNestedObjectValues(formValidations[3], true),
          );
          schoolAdminsFormRef.current?.setTouched(
            setNestedObjectValues(formValidations[4], true),
          );
        }, 100);
        return;
      }

      await Promise.all([
        organizationFormRef.current?.submitForm(),
        organizationMembersFormRef.current?.submitForm(),
        schoolFormRef.current?.submitForm(),
        schoolAddressesFormRef.current?.submitForm(),
        schoolAdminsFormRef.current?.submitForm(),
      ]);

      // Clear any existing timeout and reset error state on success
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      dispatch(setAddSchoolFormHasError(false));
      return;
    } catch (error) {
      // Clear any existing timeout
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }

      dispatch(setAddSchoolFormHasError(true));

      // Auto-clear error after 5 seconds
      errorTimeoutRef.current = setTimeout(() => {
        dispatch(setAddSchoolFormHasError(false));
      }, 5000);
    }
  };

  // Helper function to set nested object values (for touched fields)
  const setNestedObjectValues = (object, value) => {
    if (!object || typeof object !== "object") return {};

    const result = {};

    Object.keys(object).forEach((key) => {
      if (
        typeof object[key] === "object" &&
        object[key] !== null &&
        !Array.isArray(object[key])
      ) {
        result[key] = setNestedObjectValues(object[key], value);
      } else if (Array.isArray(object[key])) {
        result[key] = object[key].map((item, index) =>
          typeof item === "object" ? setNestedObjectValues(item, value) : value,
        );
      } else {
        result[key] = value;
      }
    });

    return result;
  };
  const items = [
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.ORGANIZATION,
      title: _.upperFirst(
        t("organizationAccordionTitle", {
          defaultValue: organizationAccordionTitle,
        }),
      ),
      subtitle: _.upperFirst(
        t("organizationAccordionSubtitle", {
          defaultValue: organizationAccordionSubtitle,
        }),
      ),
      icon: <LucideBuilding2 />,
      content: (
        <SchoolScreenOrganizationFormComponent ref={organizationFormRef} />
      ),
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.ORGANIZATION_MEMBERS,
      title: _.upperFirst(
        t("organizationMembersAccordionTitle", {
          defaultValue: organizationMembersAccordionTitle,
        }),
      ),
      subtitle: _.upperFirst(
        t("organizationMembersAccordionSubtitle", {
          defaultValue: organizationMembersAccordionSubtitle,
        }),
      ),
      icon: <UsersIcon />,
      content: (
        <SchoolScreenOrganizationMembersFormComponent
          ref={organizationMembersFormRef}
        />
      ),
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.SCHOOL,
      title: _.upperFirst(
        t("schoolAccordionTitle", {
          defaultValue: schoolAccordionTitle,
        }),
      ),
      subtitle: _.upperFirst(
        t("schoolAccordionSubtitle", {
          defaultValue: schoolAccordionSubtitle,
        }),
      ),
      icon: <School />,
      content: <SchoolScreenSchoolFormComponent ref={schoolFormRef} />,
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.SCHOOL_ADDRESSES,
      title: _.upperFirst(
        t("schoolAddressesAccordionTitle", {
          defaultValue: schoolAddressesAccordionTitle,
        }),
      ),
      subtitle: _.upperFirst(
        t("schoolAddressesAccordionSubtitle", {
          defaultValue: schoolAddressesAccordionSubtitle,
        }),
      ),
      icon: <MapPinnedIcon />,
      content: (
        <SchoolScreenSchoolAddressesFormComponent
          ref={schoolAddressesFormRef}
        />
      ),
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.SCHOOL_ADMINS,
      title: _.upperFirst(
        t("schoolAdminsAccordionTitle", {
          defaultValue: schoolAdminsAccordionTitle,
        }),
      ),
      subtitle: _.upperFirst(
        t("schoolAdminsAccordionSubtitle", {
          defaultValue: schoolAdminsAccordionSubtitle,
        }),
      ),
      icon: <User />,
      content: (
        <SchoolScreenSchoolAdminsFormComponent ref={schoolAdminsFormRef} />
      ),
    },
  ];

  return (
    <>
      <div className="hidden">
        <SchoolScreenOrganizationFormComponent ref={organizationFormRef} />
        <SchoolScreenOrganizationMembersFormComponent
          ref={organizationMembersFormRef}
        />
        <SchoolScreenSchoolFormComponent ref={schoolFormRef} />
        <SchoolScreenSchoolAddressesFormComponent
          ref={schoolAddressesFormRef}
        />
        <SchoolScreenSchoolAdminsFormComponent ref={schoolAdminsFormRef} />
      </div>
      <div
        className={`flex items-center mb-4 ${addSchoolFormHasError ? "justify-between" : "justify-end"}`}
      >
        {addSchoolFormHasError && (
          <div className="w-full rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 mr-4">
            <p className="text-sm text-destructive">
              {"Please fill out all required fields."}
            </p>
          </div>
        )}
        <Button onClick={handleSubmit} className={"hover:cursor-pointer"}>
          Submit
        </Button>
      </div>
      <Accordion
        type="single"
        className=""
        defaultValue={SCHOOL_FORM_ACCORDION_ITEMS.ORGANIZATION}
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className={"hover:no-underline cursor-pointer"}>
              <div className="flex flex-row items-center gap-3 w-full">
                <span className="flex items-center justify-center w-8 h-8">
                  {item.icon}
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-base">
                    {_.upperFirst(item.title)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {_.upperFirst(item.subtitle)}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default SchoolScreenFormComponent;
