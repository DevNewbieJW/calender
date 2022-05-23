import cn from "classnames";
import { useField } from "formik";
import React from "react";

const FieldInput = ({
  onBlur,
  onWarning,
  label,
  name,
  type = "text",
  placeholder,
  autoFocus,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col text-sm">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={cn(
          "h-10 px-3 rounded focus:outline-1 text-black",
          meta.touched && meta.error && "border border-red-600"
        )}
        type={type}
        {...field}
        placeholder={placeholder || label}
        onBlur={(e) => {
          onBlur && onBlur(field.value);
          field.onBlur(e);
        }}
        autoFocus={!field.value && autoFocus}
      />
      {onWarning && (
        <span className="mt-2 -mb-2 text-yellow-600">
          {meta.touched && !meta.error && field.value && onWarning(field.value)}
        </span>
      )}
      <span className="mt-2 text-red-600">{meta.touched && meta.error}</span>
    </div>
  );
};

export default FieldInput;
