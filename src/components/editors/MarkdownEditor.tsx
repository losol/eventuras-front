import {
  BoldButton,
  Divider,
  Editor,
  EditorComposer,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertLinkButton,
  ItalicButton,
  ToolbarPlugin,
  UnderlineButton,
} from 'verbum';

export default function MarkdownEditor() {
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true}>
        <ToolbarPlugin defaultFontSize="20px">
          <FontFamilyDropdown />
          <FontSizeDropdown />
          <Divider />
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <InsertLinkButton />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
}
