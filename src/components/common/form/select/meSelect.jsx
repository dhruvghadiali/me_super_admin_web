import { X } from "lucide-react";

import { Label } from "@MEShadcnComponents/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@MEShadcnComponents/select";
import {
  selectClassNameByVariant,
  selectLabelClassNameByVariant,
  selectMessageClassNameByVariant,
  selectedValueClassNameByVariant,
} from "@MECommonComponents/form/select/meSelectClassNameWrapper";

import _ from "lodash";

const MESelectComponent = (props) => {
  const {
    label,
    items,
    message,
    disabled,
    required,
    clearable,
    placeholder,
    labelvariant,
    onValueChange,
    selectVariant,
    selectedValue,
    messagevariant,
    selectedVariant,
  } = props;

  return (
    <>
      <div className="space-y-1.5 w-full">
        <Label
          className={`${selectLabelClassNameByVariant(labelvariant)} text-sm font-medium`}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <div className="relative w-full">
          <Select
            onValueChange={(value) => onValueChange(value)}
            value={selectedValue}
            disabled={disabled}
          >
            <SelectTrigger
              className={`w-full py-5 text-primary border-input shadow-xs focus-visible:border-primary/80 focus-visible:ring-primary/20 focus:ring-0`}
            >
              <SelectValue placeholder={_.upperFirst(placeholder)} />
            </SelectTrigger>
            {items && items.length > 0 && (
              <SelectContent>
                {_.map(items, (item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                    className={`${
                      _.toLower(selectedValue) === _.toLower(item.value)
                        ? selectedValueClassNameByVariant(selectedVariant)
                        : ""
                    }`}
                  >
                    {_.upperFirst(item.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
          {clearable && selectedValue && !disabled && (
            <button
              type="button"
              onClick={() => onValueChange("")}
              className="absolute top-1/2 -translate-y-1/2 right-10 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Clear ${label || "selection"}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {message && (
          <p
            className={`mt-4 mb-5 text-xs ${selectMessageClassNameByVariant(
              messagevariant,
            )}`}
            role="alert"
            aria-live="polite"
          >
            {"message"}
          </p>
        )}
      </div>
    </>
  );
};

export default MESelectComponent;
