import React from 'react';
import { Typography } from 'components/common/Typography';

interface TextInputProps {
  label: string;
  type: 'text' | 'password' | 'email';
  name: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  name,
  error,
  ...inputProps
}) => {
  const className = error ? 'border-error' : '';
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>
        <Typography type={'Ag-14-regular'} children={label} />
      </label>

      <input
        className={`form-input rounded-lg min-w-full text-sm opacity-70 border-green-light focus:border-2 focus:border-lime-500 focus:ring-0   ${className}`}
        type={type}
        name={name}
        {...inputProps}
      />

      {!!error && (
        <div className="text-sm text-error">
          <Typography type={'Ag-14-regular'} children={error} />
        </div>
      )}
    </div>
  );
};

export default TextInput;
