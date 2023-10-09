import { MarkdownEditor as ScriboEditor } from '@losol/scribo-markdown';
import React from 'react';

export type MarkdownEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = props => {
  return (
    <div>
      <ScriboEditor initialMarkdown={props.value} onChange={props.onChange} />
    </div>
  );
};

MarkdownEditor.displayName = 'markdowneditor';
export default MarkdownEditor;
