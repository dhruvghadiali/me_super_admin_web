import { Input } from "@MEShadcnComponents/input";

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
      <label
        htmlFor={id}
        className={`text-sm font-medium ${errorMessage ? "text-destructive" : "text-foreground"}`}
      >
        {label}
      </label>
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
        <p className="text-xs text-destructive mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default MEInputComponent;
