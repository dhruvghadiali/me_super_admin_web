import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@MEShadcnComponents/input";

const MEPasswordInputComponent = (props) => {
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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={`text-sm font-medium ${errorMessage ? "text-destructive" : "text-foreground"}`}
      >
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          className="h-10 sm:h-11 pr-10"
          autoComplete={autoComplete}
          aria-invalid={!!errorMessage}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          type="button"
          className={`absolute right-3 top-1/2 -translate-y-1/2  hover:text-foreground transition-colors hover:cursor-pointer ${errorMessage ? "text-destructive" : "text-muted-foreground"}`}
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>
      {errorMessage && (
        <p className="text-xs text-destructive mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default MEPasswordInputComponent;
