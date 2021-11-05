import { forwardRef, useEffect, useState } from 'react';
import { Card, CARD_SIZE, CreatableSelectBox } from '..';
import { Editor } from '@toast-ui/react-editor';
import { EditorWrapper, TitleCount, TitleInput } from './NewPostCard.styles';
import { PLACEHOLDER, POST_TITLE } from '../../constants';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import useSnackBar from '../../hooks/useSnackBar';
import useCard from '../../hooks/useCard';

const NewPostCard = forwardRef(({ postOrder, tagOptions }, ref) => {
  const [title, setTitle] = useState('');
  const { isSnackBarOpen, SnackBar } = useSnackBar();
  const { uploadImage } = useCard();

  const assignRefValue = (key, value) =>
    (ref.current[postOrder] = { ...ref.current[postOrder], [key]: value });

  const selectTag = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      actionMeta.option.label = '#' + actionMeta.option.label;
    }
    assignRefValue('tags', newValue);
  };

  useEffect(() => {
    if (title.length <= POST_TITLE.MAX_LENGTH) return;

    setTitle((prevState) => prevState.substr(0, POST_TITLE.MAX_LENGTH));
  }, [title]);

  return (
    <Card size={CARD_SIZE.LARGE}>
      <TitleCount>{title.length}/50</TitleCount>
      <TitleInput
        type="text"
        placeholder={PLACEHOLDER.POST_TITLE}
        minLength={POST_TITLE.MIN_LENGTH}
        maxLength={POST_TITLE.MAX_LENGTH}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        autoFocus
        ref={(element) => assignRefValue('title', element)}
      />
      <hr />
      <EditorWrapper>
        <Editor
          placeholder={PLACEHOLDER.POST_CONTENT}
          previewStyle="vertical"
          height="60vh"
          initialEditType="markdown"
          toolbarItems={[['heading', 'bold', 'italic', 'strike']]}
          extendedAutolinks={true}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          ref={(element) => assignRefValue('content', element)}
          hooks={{
            addImageBlobHook: uploadImage,
          }}
        />
      </EditorWrapper>
      <CreatableSelectBox options={tagOptions} placeholder={PLACEHOLDER.TAG} onChange={selectTag} />
      {isSnackBarOpen && <SnackBar />}
    </Card>
  );
});

export default NewPostCard;
