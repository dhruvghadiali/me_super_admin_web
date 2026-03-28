import {
  LucideBuilding2,
  School,
  UsersIcon,
  MapPinnedIcon,
  User,
} from "lucide-react";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import { SCHOOL_FORM_ACCORDION_ITEMS } from "@MEHelpers/enums";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@MEShadcnComponents/accordion";

import SchoolScreenSchoolFormComponent from "@MEScreenComponents/schools/form/schoolForm";
import SchoolScreenOrganizationFormComponent from "@MEScreenComponents/schools/form/organizationForm";
import SchoolScreenSchoolAdminsFormComponent from "@MEScreenComponents/schools/form/schoolAdminsForm";
import SchoolScreenSchoolAddressesFormComponent from "@MEScreenComponents/schools/form/schoolAddressesForm";
import SchoolScreenOrganizationMembersFormComponent from "@MEScreenComponents/schools/form/organizationMembersForm";

const SchoolScreenFormComponent = () => {
  const items = [
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.ORGANIZATION,
      title: "Organization",
      subtitle: "General organization settings",
      icon: <LucideBuilding2 />,
      content: <SchoolScreenOrganizationFormComponent />,
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.ORGANIZATION_MEMBERS,
      title: "Organization Members",
      subtitle: "Manage your organization members",
      icon: <UsersIcon />,
      content: <SchoolScreenOrganizationMembersFormComponent />,
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.SCHOOL,
      title: "School",
      subtitle: "School information and details",
      icon: <School />,
      content: <SchoolScreenSchoolFormComponent />,
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.SCHOOL_ADDRESSES,
      title: "School Addresses",
      subtitle: "Manage school addresses",
      icon: <MapPinnedIcon />,
      content: <SchoolScreenSchoolAddressesFormComponent />,
    },
    {
      value: SCHOOL_FORM_ACCORDION_ITEMS.SCHOOL_ADMINS,
      title: "School Admins",
      subtitle: "Manage school administrators",
      icon: <User />,
      content: <SchoolScreenSchoolAdminsFormComponent />,
    },
  ];

  return (
    <>
      <div className="flex items-end justify-end mb-4">
        <Button>Submit</Button>
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
