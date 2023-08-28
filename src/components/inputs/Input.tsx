import React from 'react';

export type InputTextProps = {
  [x: string]: any;
};
/**
 * Basic text input field
 * requires ref forwarding because it is used by react hooks
 * @see https://stackoverflow.com/questions/67877887/react-hook-form-v7-function-components-cannot-be-given-refs-attempts-to-access
 */

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  const oProps = { ...props };
  delete oProps.children;
  delete oProps.type;
  delete oProps.className;
  return (
    <div className="mb-3">
      <input
        ref={ref}
        className={`${props.className} 
        appearance-none 
        border 
        rounded 
        w-full 
        py-2 
        px-3 
        text-gray-700 
        leading-tight 
        focus:outline-none 
        focus:shadow-outline`}
        type="text"
        placeholder={props.placeholder}
        {...oProps}
      />
      {props.errors && (
        <p role="alert" className="text-red-500">
          {props.errors[props.name]?.message}
        </p>
      )}
    </div>
  );
});

InputText.displayName = 'InputText';