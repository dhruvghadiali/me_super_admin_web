import { Input } from "@MEShadcnComponents/input";
import { Label } from "@MEShadcnComponents/label";

const MEInputComponent = (props) => {
  const {
    id,
    name,
    label,
    value,
    placeholder,
    autoComplete,
    errorMessage,
    required = false,
    onBlur,
    onChange,
  } = props;

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className={`text-sm font-medium ${errorMessage ? "text-destructive" : "text-foreground"}`}
      >
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        className="h-10 sm:h-11"
        autoComplete={autoComplete}
        aria-invalid={!!errorMessage}
        onBlur={onBlur}
        onChange={onChange}
      />
      {errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default MEInputComponent;
