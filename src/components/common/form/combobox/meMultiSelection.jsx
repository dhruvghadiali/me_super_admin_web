import _ from "lodash";

import { Label } from "@MEShadcnComponents/label";
import { SELECTION_COMPONENT_VARIANTS } from "@MEHelpers/enums";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxInput,
} from "@MEShadcnComponents/combobox";
import {
  comboboxClassNameByVariant,
  comboboxLabelClassNameByVariant,
  comboboxMessageClassNameByVariant,
  selectedValueClassNameByVariant,
} from "./meComboboxClassNameWrapper";

const MEMultiSelectionComponent = (props) => {
  const {
    label,
    items = [],
    message,
    disabled,
    required,
    placeholder,
    labelvariant,
    onValueChange,
    selectedValues = [],
    selectVariant,
    messagevariant,
    selectedVariant,
  } = props;
  const anchor = useComboboxAnchor();

  // Extract values for combobox items (handle both 'label' and 'lable' typo)
  const comboboxItems = items.map((item) => {
    if (typeof item === "string") return item;
    return item.value || item;
  });

  // Helper function to get item label (handle both 'label' and 'lable' typo)
  const getItemLabel = (value) => {
    if (typeof value === "string") return value;
    const item = items.find((i) => (i.value || i) === value);
    return item ? item.label || item.lable || item.value || item : value;
  };

  return (
    <div className="space-y-1.5 w-full">
      <Label
        className={`${message ? comboboxLabelClassNameByVariant(SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE) : comboboxLabelClassNameByVariant(labelvariant)} text-sm font-medium`}
      >
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Combobox
        multiple
        autoHighlight
        items={comboboxItems}
        value={selectedValues}
        onValueChange={(values) => onValueChange(values)}
        disabled={disabled}
      >
        <ComboboxChips
          ref={anchor}
          className={`w-full ${_.size(selectedValues) > 0 ? "py-2.25" : "py-2.5"} ${message ? comboboxClassNameByVariant(SELECTION_COMPONENT_VARIANTS.DESTRUCTIVE) : comboboxClassNameByVariant(selectVariant)}`}
        >
          <ComboboxValue
            placeholder={
              selectedValues.length === 0 ? _.upperFirst(placeholder) : ""
            }
          >
            {(values) => (
              <>
                {values.map((value) => (
                  <ComboboxChip key={value} value={value}>
                    {_.upperFirst(getItemLabel(value))}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  placeholder={
                    values.length === 0 ? _.upperFirst(placeholder) : ""
                  }
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxList>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            {comboboxItems.map((item) => (
              <ComboboxItem
                key={item}
                value={item}
                className={`${selectedValues.includes(item) ? selectedValueClassNameByVariant(selectedVariant) : ""}}`}
              >
                {_.upperFirst(getItemLabel(item))}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {message && (
        <p
          className={`mt-1 text-xs ${comboboxMessageClassNameByVariant(messagevariant)}`}
          role="alert"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default MEMultiSelectionComponent;
