import React from 'react';
import style from './InputUI.module.scss';

type inputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  setValue?: Function;
};

const InputUI: React.FC<inputProps> = ({
  type = 'text',
  placeholder = 'text',
  value,
  setValue = () => 'text',
}) => {
  return (
    <div>
      <input
        className={style.input}
        id="password"
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputUI;
