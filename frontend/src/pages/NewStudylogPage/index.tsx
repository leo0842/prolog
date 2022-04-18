/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import { useState, ChangeEventHandler, FormEventHandler, useRef } from 'react';
import { MainContentStyle } from '../../PageRouter';

import { FlexStyle, JustifyContentEndStyle } from '../../styles/flex.styles';

import { ERROR_MESSAGE, ALERT_MESSAGE, PATH } from '../../constants';

import { StudylogForm } from '../../models/Studylogs';
import { COLOR } from '../../enumerations/color';
import { useMutation } from 'react-query';
import { getLocalStorageItem } from '../../utils/localStorage';
import LOCAL_STORAGE_KEY from '../../constants/localStorage';
import { SUCCESS_MESSAGE } from '../../constants/message';
import { useHistory } from 'react-router-dom';
import { requestPostStudylog } from '../../apis/studylogs';
import Sidebar from './Sidebar';
import Editor from '../../components/Editor/Editor';

const SubmitButtonStyle = css`
  width: 100%;
  background-color: ${COLOR.LIGHT_BLUE_300};
  padding: 1rem 0;
  border-radius: 16px;

  :hover {
    background-color: ${COLOR.LIGHT_BLUE_500};
  }
`;

const NewStudylogPage = () => {
  const history = useHistory();

  const editorContentRef = useRef<any>(null);

  const [studylogContent, setStudylogContent] = useState<StudylogForm>({
    title: '',
    content: '',
    missionId: null,
    sessionId: null,
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

  const onSelectMission = (mission: { value: string; label: string }) =>
    setStudylogContent({ ...studylogContent, missionId: Number(mission.value) });

  const onSelectSession = (session: { value: string; label: string }) => {
    console.log(session);
    setStudylogContent({ ...studylogContent, sessionId: Number(session.value) });
  };

  const onCreateStudylog: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const content = editorContentRef.current?.getInstance().getMarkdown() || '';

    if (studylogContent.title.length === 0) {
      alert(ALERT_MESSAGE.NO_TITLE);
      return;
    }

    if (content.length === 0) {
      alert(ALERT_MESSAGE.NO_CONTENT);
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
            <Editor
              height="80rem"
              title={studylogContent.title}
              editorContentRef={editorContentRef}
              onChangeTitle={onChangeTitle}
            />
            <div
              css={[
                FlexStyle,
                JustifyContentEndStyle,
                css`
                  margin-top: 1rem;
                `,
              ]}
            >
              <button css={[SubmitButtonStyle]}>작성 완료</button>
            </div>
          </div>
          <Sidebar
            selectedMissionId={studylogContent.missionId}
            selectedSessionId={studylogContent.sessionId}
            selectedTagList={studylogContent.tags}
            onSelectTag={onSelectTag}
            onSelectMission={onSelectMission}
            onSelectSession={onSelectSession}
          />
        </div>
      </form>
    </div>
  );
};

export default NewStudylogPage;
