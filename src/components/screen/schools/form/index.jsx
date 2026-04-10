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
import { addSchool } from "@MERedux/schools/schoolsAction";
import { setAddSchoolAPIPayload } from "@MEUtils/apiPayload";
import {
  SCHOOL_INFORMATION_VIEW,
  SCHOOL_SCREEN_DB_OPERATIONS,
  SCHOOL_FORM_ACCORDION_ITEMS,
} from "@MEHelpers/enums";
import {
  resetFormValues,
  setAddSchoolFormHasError,
  setSchoolInformationView,
  setSchoolScreenDBOperation,
} from "@MERedux/schools/schoolsSlice";
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

import MEScreenHeaderComponent from "@MECommonComponents/header/meScreenHeader";
import SchoolScreenSchoolFormComponent from "@MEScreenComponents/schools/form/schoolForm";
import SchoolScreenOrganizationFormComponent from "@MEScreenComponents/schools/form/organizationForm";
import SchoolScreenSchoolAdminsFormComponent from "@MEScreenComponents/schools/form/schoolAdminsForm";
import SchoolScreenSchoolAddressesFormComponent from "@MEScreenComponents/schools/form/schoolAddressesForm";
import SchoolScreenOrganizationMembersFormComponent from "@MEScreenComponents/schools/form/organizationMembersForm";

const SchoolScreenFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const {
    schoolFormValues,
    addSchoolFormHasError,
    isSchoolFormValidated,
    organizationFormValues,
    schoolAdminsFormValues,
    schoolScreenDBOperation,
    schoolAddressesFormValues,
    isOrganizationFormValidated,
    isSchoolAdminsFormValidated,
    schoolScreenDBOperationError,
    organizationMembersFormValues,
    schoolScreenDBOperationLoader,
    isSchoolAddressesFormValidated,
    isOrganizationMembersFormValidated,
  } = useSelector((state) => state.schools);

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
      if (
        isSchoolFormValidated &&
        isOrganizationFormValidated &&
        isOrganizationMembersFormValidated &&
        isSchoolAddressesFormValidated &&
        isSchoolAdminsFormValidated &&
        _.size(schoolAddressesFormValues) === _.size(schoolAdminsFormValues)
      ) {
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }

        dispatch(setAddSchoolFormHasError(false));
        dispatch(
          addSchool(
            setAddSchoolAPIPayload({
              school: schoolFormValues,
              organization: organizationFormValues,
              members: organizationMembersFormValues,
              addresses: schoolAddressesFormValues,
              admins: schoolAdminsFormValues,
            }),
          ),
        );
      } else {
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }

        errorTimeoutRef.current = setTimeout(() => {
          dispatch(setAddSchoolFormHasError(false));
        }, 5000);

        dispatch(setAddSchoolFormHasError(true));
      }
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

  const handleClose = () => {
    dispatch(resetFormValues());
    dispatch(setSchoolInformationView(SCHOOL_INFORMATION_VIEW.TABLE));
    dispatch(setSchoolScreenDBOperation(SCHOOL_SCREEN_DB_OPERATIONS.VIEW));
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
      <div
        className={`flex items-center mb-4 justify-between`} // ${addSchoolFormHasError ? "justify-between" : "justify-end"}
      >
        <MEScreenHeaderComponent
          title={
            schoolScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD
              ? "New School"
              : "Update School Details"
          }
          subtitle={
            schoolScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD
              ? "Complete the form to register a new school"
              : "Make changes and keep information up to date"
          }
        />
        <div>
          {schoolScreenDBOperation === SCHOOL_SCREEN_DB_OPERATIONS.ADD && (
            <Button
              className={"hover:cursor-pointer"}
              disabled={schoolScreenDBOperationLoader}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          )}
          <Button
            variant="outline"
            className={"hover:cursor-pointer ml-2"}
            disabled={schoolScreenDBOperationLoader}
            onClick={() => handleClose()}
          >
            Close
          </Button>
        </div>
      </div>
      {addSchoolFormHasError && (
        <div className="w-full rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 mr-4">
          <p className="text-sm text-destructive">
            {"Please fill out all required fields."}
          </p>
        </div>
      )}
      {schoolScreenDBOperationError && (
        <div className="w-full rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 mr-4">
          <p className="text-sm text-destructive">
            {schoolScreenDBOperationError}
          </p>
        </div>
      )}
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
