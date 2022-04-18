/** @jsxImportSource @emotion/react */

// Markdown Parser
import { Editor as ToastEditor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { markdownStyle } from '../../styles/markdown.styles';
import { EditorStyle } from '../Introduction/Introduction.styles';
import { EditorTitleStyle, EditorWrapperStyle } from './Editor.styles';
import { ChangeEventHandler, MutableRefObject } from 'react';
import { getSize } from '../../utils/styles';

interface EditorProps {
  height: number | string;
  title?: string;
  hasTitle?: boolean;
  titlePlaceholder?: string;
  editorContentRef: MutableRefObject<unknown>;
  content?: string;
  onChangeTitle?: ChangeEventHandler<HTMLInputElement>;
  onChangeContent?: () => void;
  toolbarItems?: string[][];
}

const DEFAULT_TOOLBAR_ITEMS = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote'],
  ['ul', 'ol', 'task'],
  ['indent'],
];

const Editor = (props: EditorProps): JSX.Element => {
  const {
    height,
    hasTitle = true,
    title = '',
    titlePlaceholder = '제목을 입력하세요',
    content,
    onChangeTitle,
    editorContentRef,
    toolbarItems = DEFAULT_TOOLBAR_ITEMS,
  } = props;

  return (
    <div css={[EditorStyle, markdownStyle, EditorWrapperStyle]}>
      {hasTitle && (
        <div css={[EditorTitleStyle]}>
          <input placeholder={titlePlaceholder} value={title} onChange={onChangeTitle} />
        </div>
      )}
      <ToastEditor
        ref={(element) => {
          editorContentRef.current = element;
        }}
        initialValue={content || ''}
        height={getSize(height)}
        initialEditType="markdown"
        toolbarItems={toolbarItems}
        extendedAutolinks={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
};

export default Editor;
