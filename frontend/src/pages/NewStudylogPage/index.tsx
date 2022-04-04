/** @jsxImportSource @emotion/react */

import { useState, ChangeEventHandler, FormEventHandler, useRef } from 'react';
import { MainContentStyle } from '../../PageRouter';

import CreatableSelectBox from '../../components/CreatableSelectBox/CreatableSelectBox';

import { FlexStyle, JustifyContentEndStyle } from '../../styles/flex.styles';
import { EditorStyle } from '../../components/Introduction/Introduction.styles';

// Markdown Parser
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import { css } from '@emotion/react';
import { markdownStyle } from '../../styles/markdown.styles';

import { ERROR_MESSAGE, PATH, PLACEHOLDER } from '../../constants';

import { useMissions, useTags } from '../../hooks/queries/filters';
import { StudylogForm } from '../../models/Studylogs';
import SelectBox from '../../components/Controls/SelectBox';
import { COLOR } from '../../enumerations/color';
import { useMutation } from 'react-query';
import { getLocalStorageItem } from '../../utils/localStorage';
import LOCAL_STORAGE_KEY from '../../constants/localStorage';
import { SUCCESS_MESSAGE } from '../../constants/message';
import { useHistory } from 'react-router-dom';
import { requestPostStudylog } from '../../apis/studylogs';

const editorHeight = '800px';

const NewStudylogPage = () => {
  const history = useHistory();

  const editorContentRef = useRef<any>(null);

  const { data: missions = [] } = useMissions();
  const { data: tags = [] } = useTags();
  const tagOptions = tags.map(({ name }) => ({ value: name, label: `#${name}` }));
  const missionOptions = missions.map(({ id, name }) => ({ value: `${id}`, label: `${name}` }));

  const [studylogContent, setStudylogContent] = useState<StudylogForm>({
    title: '',
    content: '',
    missionId: null,
    tags: [],
  });

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStudylogContent({ ...studylogContent, title: event.target.value });
  };

  const onSelectTag = (tags, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      actionMeta.option.label = '#' + actionMeta.option.label;
    }
    setStudylogContent({
      ...studylogContent,
      tags: tags.map(({ value }) => ({ name: value })),
    });
  };

  const onSelectMission = (mission: { value: string; label: string }) => {
    setStudylogContent({ ...studylogContent, missionId: Number(mission.value) });
  };

  const onCreateStudylog: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const content = editorContentRef.current?.getInstance().getMarkdown() || '';

    if (studylogContent.title.length === 0) {
      alert('제목을 입력하세요');
      return;
    }

    if (content.length === 0) {
      alert('내용을 입력하세요');
      return;
    }

    if (studylogContent.missionId === null) {
      alert('미션을 선택하세요');
      return;
    }

    // FIXME: 한 타임 밀림
    createStudylogRequest({
      ...studylogContent,
      content,
    });
  };

  const { mutate: createStudylogRequest } = useMutation(
    (data: StudylogForm) =>
      requestPostStudylog({
        accessToken: getLocalStorageItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
        data,
      }),
    {
      onSuccess: async (data) => {
        alert(SUCCESS_MESSAGE.CREATE_POST);
        history.push(PATH.STUDYLOG);
      },
      onError: (error: { code: number; message: string }) => {
        console.log(error);
        alert(ERROR_MESSAGE[error.code] ?? ERROR_MESSAGE.DEFAULT);
      },
    }
  );

  return (
    <div
      css={[
        MainContentStyle,
        css`
          padding: 10px 0 100px;
        `,
      ]}
    >
      <form onSubmit={onCreateStudylog}>
        <div
          css={[
            css`
              display: flex;

              > *:not(:last-child) {
                margin-right: 10px;
              }
            `,
          ]}
        >
          <div
            css={[
              css`
                flex-grow: 1;
              `,
            ]}
          >
            <div
              css={[
                EditorStyle,
                markdownStyle,
                css`
                  border-radius: 20px;
                  border: 1px solid ${COLOR.LIGHT_GRAY_100};

                  .toastui-editor-mode-switch {
                    height: 48px;
                    border-bottom-right-radius: 20px;
                    border-bottom-left-radius: 20px;
                  }
                `,
              ]}
            >
              <div
                css={css`
                  padding: 2rem 1.6rem 1.6rem;
                  background-color: ${COLOR.LIGHT_BLUE_200};
                  border-top-right-radius: 20px;
                  border-top-left-radius: 20px;
                `}
              >
                <input
                  placeholder="제목을 입력해주세요"
                  css={[
                    css`
                      width: 100%;
                      font-size: 2.4rem;
                      border-radius: 10px;
                      border: none;
                      padding: 4px 10px;
                    `,
                  ]}
                  value={studylogContent.title}
                  onChange={onChangeTitle}
                />
              </div>
              <Editor
                ref={(element) => {
                  editorContentRef.current = element;
                }}
                initialValue={''}
                height={editorHeight}
                initialEditType="markdown"
                toolbarItems={[
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task'],
                  ['indent'],
                ]}
                extendedAutolinks={true}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
              />
            </div>
            <div
              css={[
                FlexStyle,
                JustifyContentEndStyle,
                css`
                  margin-top: 1rem;
                `,
              ]}
            >
              <button
                css={[
                  css`
                    width: 100%;
                    background-color: ${COLOR.LIGHT_BLUE_300};
                    padding: 1rem 0;
                    border-radius: 16px;

                    :hover {
                      background-color: ${COLOR.LIGHT_BLUE_500};
                    }
                  `,
                ]}
              >
                작성 완료
              </button>
            </div>
          </div>
          <div
            css={css`
              width: 240px;
              padding: 1rem;
              background-color: white;
              border-radius: 20px;
              border: 1px solid ${COLOR.LIGHT_GRAY_100}; ;
            `}
          >
            <ul
              css={css`
                > li:not(:last-child) {
                  margin-bottom: 16px;
                }
              `}
            >
              <li>
                <h3
                  css={css`
                    border-bottom: 1px solid ${COLOR.DARK_GRAY_500};
                    margin-bottom: 10px;
                    line-height: 1.5;
                    font-weight: bold;
                    padding-bottom: 2px;
                    font-size: 1.8rem;
                  `}
                >
                  mission*
                </h3>
                <div>
                  <SelectBox
                    options={missionOptions}
                    placeholder="선택"
                    onChange={onSelectMission}
                  />
                </div>
              </li>
              <li>
                <h3
                  css={css`
                    border-bottom: 1px solid ${COLOR.DARK_GRAY_500};
                    margin-bottom: 10px;
                    line-height: 1.5;
                    font-weight: bold;
                    padding-bottom: 2px;
                    font-size: 1.8rem;
                  `}
                >
                  tags
                </h3>
                <CreatableSelectBox
                  options={tagOptions}
                  placeholder={PLACEHOLDER.TAG}
                  onChange={onSelectTag}
                />
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewStudylogPage;
