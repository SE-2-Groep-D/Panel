// eslint-disable-next-line react/prop-types
import PropTypes from "prop-types";
import {ToolTip} from "@components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

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
  pattern
}) {
  const [showPassword, setShowPassword] = useState(false);
  type = (type === 'password' && showPassword) ? 'text' : type || 'text';

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
    const newValue = e.target.value;

    if (onChange !== undefined && onChange !== null)
      onChange({
        element: e.target.parentNode,
        oldValue: value,
        value: newValue,
      });
  }

  return (
    <div className="inputField" id={id} value={value}>
      <label htmlFor={"input_" + id}>{children}</label>
      <p className="message">{message}</p>
      {Field}
      <PasswordButton type={type} showPassword={showPassword} setShowPassword={setShowPassword}/>
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
  pattern: PropTypes.string
};

function PasswordButton({type, showPassword, setShowPassword}) {
  if(type !== 'password' && showPassword === false) {
    return null;
  }

  if(showPassword) {
    return <button aria-label='Klik op de knop om je wachtwoord te verbergen.' onClick={(e) => {
      e.preventDefault();
      setShowPassword(false)
    }}>
      <FontAwesomeIcon icon={faEye} />
    </button>
  }

  return <button aria-label='Klik deze knop om je wachtwoord te laten zien.' onClick={(e) => {
    e.preventDefault();
    setShowPassword(true)
  }}>
    <FontAwesomeIcon icon={faEyeSlash} />
  </button>
}
