import { Input } from "@MEShadcnComponents/input";
import { Label } from "@MEShadcnComponents/label";

const MEInputComponent = (props) => {
  const {
    id,
    name,
    label,
    value,
    onBlur,
    onChange,
    placeholder,
    autoComplete,
    errorMessage,
  } = props;

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className={`text-sm font-medium ${errorMessage ? "text-destructive" : "text-foreground"}`}
      >
        {label}
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
        <p className="mt-2 mb-5 text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};

export default MEInputComponent;
