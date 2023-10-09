'use client';

import { Controller } from 'react-hook-form';

import MarkdownEditor from '@/components/forms/MarkdownEditor';

interface MarkdownInputProps {
  name: string;
  field: any;
  errors: any;
  control: any;
}

export default function MarkdownInput(props: MarkdownInputProps) {
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <Controller
        control={props.control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <MarkdownEditor onChange={onChange} value={value} />
        )}
      />
      {props.errors && (
        <label role="alert" className="text-red-500">
          {props.errors[props.name]?.message}
        </label>
      )}
    </>
  );
}
