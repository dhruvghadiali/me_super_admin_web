import { SELECTION_COMPONENT_VARIANTS } from "@MEHelpers/enums";

const selectVariantMap = {
  [SELECTION_COMPONENT_VARIANTS.PRIMARY]: {
    select:
      "text-primary border-primary/80 focus-visible:border-primary/80 focus-visible:ring-primary/20 focus:ring-0",
    selected: "focus:bg-primary focus:text-dark text-primary",
    message: "text-primary",
    label: "text-primary",
  },
  [SELECTION_COMPONENT_VARIANTS.SECONDARY]: {
    select:
      "text-secondary border-secondary/80 focus-visible:border-secondary/80 focus-visible:ring-secondary/20 focus:ring-0",
    selected: "focus:bg-secondary focus:text-dark text-secondary",
    message: "text-secondary",
    label: "text-secondary",
  },
  [SELECTION_COMPONENT_VARIANTS.SUCCESS]: {
    select:
      "text-success border-success/80 focus-visible:border-success/80 focus-visible:ring-success/20 focus:ring-0",
    selected: "focus:bg-success focus:text-dark text-success",
    message: "text-success",
    label: "text-success",
  },
  [SELECTION_COMPONENT_VARIANTS.WARNING]: {
    select:
      "text-warning border-warning/80 focus-visible:border-warning/80 focus-visible:ring-warning/20 focus:ring-0",
    selected: "focus:bg-warning focus:text-dark text-warning",
    message: "text-warning",
    label: "text-warning",
  },
  [SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE]: {
    select:
      "text-destructive border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/20 focus:ring-0",
    selected: "focus:bg-destructive focus:text-dark text-destructive",
    message: "text-destructive",
    label: "text-destructive",
  },
};

const selectClassNameByVariant = (inputvariant) =>
  selectVariantMap[inputvariant]?.select ||
  "border-primary/80 text-primary focus-visible:border-primary/80 focus-visible:ring-primary/20";

const selectedValueClassNameByVariant = (inputvariant) =>
  selectVariantMap[inputvariant]?.selected || "focus:bg-primary text-primary";

const selectMessageClassNameByVariant = (messagevariant) =>
  selectVariantMap[messagevariant]?.message || "text-primary";

const selectLabelClassNameByVariant = (labelvariant) =>
  selectVariantMap[labelvariant]?.label || "text-primary";

export {
  selectClassNameByVariant,
  selectLabelClassNameByVariant,
  selectedValueClassNameByVariant,
  selectMessageClassNameByVariant,
};
