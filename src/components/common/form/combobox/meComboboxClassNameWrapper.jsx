import { SELECTION_COMPONENT_VARIANTS } from "@MEHelpers/enums";

const comboboxVariantMap = {
  [SELECTION_COMPONENT_VARIANTS.PRIMARY]: {
    combobox:
      "text-primary border-input shadow-xs focus-visible:border-primary/80 focus-visible:ring-primary/20 focus:ring-0",
    selected: "data-highlighted:bg-primary data-highlighted:text-secondary text-primary",
    message: "text-primary",
    label: "text-primary",
  },
  [SELECTION_COMPONENT_VARIANTS.SECONDARY]: {
    combobox:
      "text-secondary border-input shadow-xs focus-visible:border-secondary/80 focus-visible:ring-secondary/20 focus:ring-0",
    selected: "data-highlighted:bg-secondary data-highlighted:text-dark text-secondary",
    message: "text-secondary",
    label: "text-secondary",
  },
  [SELECTION_COMPONENT_VARIANTS.SUCCESS]: {
    combobox:
      "text-success border-input shadow-xs focus-visible:border-success/80 focus-visible:ring-success/20 focus:ring-0",
    selected: "data-highlighted:bg-success data-highlighted:text-dark text-success",
    message: "text-success",
    label: "text-success",
  },
  [SELECTION_COMPONENT_VARIANTS.WARNING]: {
    combobox:
      "text-warning border-input shadow-xs focus-visible:border-warning/80 focus-visible:ring-warning/20 focus:ring-0",
    selected: "data-highlighted:bg-warning data-highlighted:text-dark text-warning",
    message: "text-warning",
    label: "text-warning",
  },
  [SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE]: {
    combobox:
      "text-destructive border-destructive shadow-xs focus-visible:border-destructive/80 focus-visible:ring-destructive/20 focus:ring-0",
    selected: "data-highlighted:bg-destructive data-highlighted:text-dark text-destructive",
    message: "text-destructive",
    label: "text-destructive",
  },
};

const comboboxClassNameByVariant = (inputvariant) =>
  comboboxVariantMap[inputvariant]?.combobox ||
  "border-primary/80 text-primary focus-visible:border-primary/80 focus-visible:ring-primary/20";

const selectedValueClassNameByVariant = (inputvariant) =>
  comboboxVariantMap[inputvariant]?.selected || "focus:bg-primary text-primary";

const comboboxMessageClassNameByVariant = (messagevariant) =>
  comboboxVariantMap[messagevariant]?.message || "text-primary";

const comboboxLabelClassNameByVariant = (labelvariant) =>
  comboboxVariantMap[labelvariant]?.label || "text-primary";


export {
  comboboxClassNameByVariant,
  comboboxLabelClassNameByVariant,
  selectedValueClassNameByVariant,
  comboboxMessageClassNameByVariant,
};
