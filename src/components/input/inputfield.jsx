import React, { useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputField({
                                     children,
                                     type,
                                     id,
                                     value,
                                     onChange,
                                     placeholder,
                                     message,
                                     size,
                                     required,
                                     pattern,
                                   }) {
  const [showPassword, setShowPassword] = useState(false);
  type = type === "password" && showPassword ? "text" : type || "text";

  const isTextArea =
      size !== undefined && size !== null && size.toLowerCase() === "big";

  const finalPlaceHolder =
      placeholder === undefined || placeholder === null ? children : placeholder;

  const Field = isTextArea ? (
      <textarea
          id={"input_" + id}
          value={value}
          onChange={handleChange}
          placeholder={finalPlaceHolder}
          required={required}
          rows={5}
      />
  ) : (
      <input
          type={type}
          id={"input_" + id}
          value={value}
          onChange={handleChange}
          placeholder={finalPlaceHolder}
          required={required}
          pattern={pattern}
      />
  );

  function handleChange(e) {
    const cleanedValue = DOMPurify.sanitize(e.target.value);

    if (onChange !== undefined && onChange !== null)
      onChange({
        element: e.target.parentNode,
        oldValue: value,
        value: cleanedValue,
      });
  }

  return (
      <div className="inputField" id={id} value={value}>
        <label htmlFor={"input_" + id}>{children}</label>
        <p className="message">{message}</p>
        {Field}
        <PasswordButton
            type={type}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
        />
      </div>
  );
}

InputField.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  size: PropTypes.oneOf(["big", "small"]),
  required: PropTypes.bool,
  pattern: PropTypes.string,
};

function PasswordButton({ type, showPassword, setShowPassword }) {
  if (type !== "password" && showPassword === false) {
    return null;
  }

  const togglePassword = (e) => {
      e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
      <button
          className="password"
          aria-label={
            showPassword
                ? "Klik op de knop om je wachtwoord te verbergen."
                : "Klik deze knop om je wachtwoord te laten zien."
          }
          onClick={togglePassword}
      >
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </button>
  );
}
