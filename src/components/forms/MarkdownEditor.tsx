/**
 * This is a placeholder editor which may be replaced by something like lexical in the near future
 * @returns <textarea />

 */

import { compiler } from 'markdown-to-jsx';
import React, { MouseEventHandler, useRef, useState } from 'react';

import Button from '../ui/Button';

export type MarkdownEditorProps = {
  [x: string]: any;
};

/**
 * TODO this follows pretty much the same pattern as Input, if this component does not diverge from those components,
 * then we can consider making it a higher order component for reusabilities sake.
 */

const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>((props, ref) => {
  const oProps = { ...props };
  delete oProps.children;
  delete oProps.type;
  delete oProps.className;
  const id = props.id ?? props.name;

  const tValue = useRef(props.defaultValue ?? '');

  const [editing, setEditing] = useState<boolean>(false);
  const [compilerValue, setCompilerValue] = useState<string>(props.defaultValue ?? '');
  console.log(props);
  const onEdit = (e: any) => {
    setCompilerValue(tValue.current);
    setEditing(!editing);
    e.preventDefault();
  };
  return (
    <div className="mb-3 bg-white text-black">
      {props.label && <label htmlFor={id}>{props.label}</label>}
      {editing ? (
        <textarea
          id={id}
          ref={ref}
          className={`${props.className ?? ''}`}
          placeholder={props.placeholder}
          {...oProps}
          onChange={e => {
            if (props.onChange) {
              props.onChange(e);
              tValue.current = e.target.value;
            }
          }}
        />
      ) : (
        compiler(compilerValue)
      )}

      {props.errors && (
        <label htmlFor={id} role="alert" className="text-red-500">
          {props.errors[props.name]?.message}
        </label>
      )}
      <div className="block w-full">
        <Button onClick={onEdit}>{editing ? 'View' : 'Edit'}</Button>
      </div>
    </div>
  );
});

MarkdownEditor.displayName = 'markdowneditor';
export default MarkdownEditor;
