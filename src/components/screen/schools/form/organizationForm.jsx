import { SELECTION_COMPONENT_VARIANTS } from "@MEHelpers/enums";
import { Button } from "@MEShadcnComponents/button";

import MEInputComponent from "@MECommonComponents/form/input/meInput";
import MESelectComponent from "@MECommonComponents/form/select/meSelect";

const SchoolScreenOrganizationFormComponent = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-6 p-2">
        <MEInputComponent label="Name" placeholder="Enter organization name" />
        <MEInputComponent
          label="Short Name"
          placeholder="Enter organization short name"
        />
        <MEInputComponent
          label="Email"
          placeholder="Enter organization email"
        />
        <MEInputComponent
          label="Phone Number"
          placeholder="Enter organization phone number"
        />
        <MEInputComponent
          label="Government Register Number"
          placeholder="Enter government register number"
        />
        <MEInputComponent
          label="Address"
          placeholder="Enter organization address"
        />
        <MESelectComponent
          label="State"
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message=""
          disabled={false}
          required={true}
          clearable={true}
          placeholder="Select state"
          selectedValue=""
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => console.log("Selected state:", value)}
        />

        <MESelectComponent
          label="District"
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message=""
          disabled={false}
          required={true}
          clearable={true}
          placeholder="Select district"
          selectedValue=""
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => console.log("Selected district:", value)}
        />

        <MESelectComponent
          label="City"
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message=""
          disabled={false}
          required={true}
          clearable={true}
          placeholder="Select city"
          selectedValue=""
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => console.log("Selected city:", value)}
        />

        <MESelectComponent
          label="Area Name"
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message=""
          disabled={false}
          required={true}
          clearable={true}
          placeholder="Select area name"
          selectedValue=""
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => console.log("Selected area name:", value)}
        />

        <MESelectComponent
          label="Zip Code"
          items={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "pending", label: "Pending" },
          ]}
          message=""
          disabled={false}
          required={true}
          clearable={true}
          placeholder="Select zip code"
          selectedValue=""
          labelvariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          messagevariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          selectedVariant={SELECTION_COMPONENT_VARIANTS.PRIMARY}
          onValueChange={(value) => console.log("Selected zip code:", value)}
        />
      </div>
      <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-primary/20">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Please review the changes before submitting
        </p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="hover:cursor-pointer"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default SchoolScreenOrganizationFormComponent;
