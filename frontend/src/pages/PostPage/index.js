import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  requestGetPost,
  requestPostScrap,
  requestDeleteScrap,
  requestPostLike,
  requestDeleteLike,
} from '../../service/requests';

import { Button, BUTTON_SIZE, Card, ProfileChip, ViewCount } from '../../components';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';

import {
  ButtonList,
  EditButtonStyle,
  DeleteButtonStyle,
  CardInner,
  IssuedDate,
  Mission,
  ProfileChipStyle,
  MainHeader,
  SubHeader,
  Tags,
  Title,
  SubHeaderRightContent,
  Content,
  ButtonIconWrapper,
  LikeIconStyle,
  ScrapButtonStyle,
  BottomContainer,
} from './styles';
import useNotFound from '../../hooks/useNotFound';
import { ALERT_MESSAGE, CONFIRM_MESSAGE, PATH, SNACKBAR_MESSAGE } from '../../constants';
import { useSelector } from 'react-redux';
import usePost from '../../hooks/usePost';
import scrapIcon from '../../assets/images/scrap.svg';
import unScrapIcon from '../../assets/images/scrap_filled.svg';
import unLikeIcon from '../../assets/images/heart.svg';
import likeIcon from '../../assets/images/heart-filled.svg';
import useSnackBar from '../../hooks/useSnackBar';
import debounce from '../../utils/debounce';

const PostPage = () => {
  const history = useHistory();
  const { id: postId } = useParams();

  const [post, setPost] = useState({});
  const [likeInfo, setLikeInfo] = useState({ liked: false, likesCount: 0 });

  const { NotFound } = useNotFound();
  const { deleteData: deletePost } = usePost({});
  const { openSnackBar } = useSnackBar();

  const accessToken = useSelector((state) => state.user.accessToken.data);
  const myName = useSelector((state) => state.user.profile.data?.username);

  // if (errorStatus) {
  //   switch (errorStatus) {
  //     case 2004:
  //       return <NotFound />;
  //     default:
  //       return;
  //   }
  // }

  const goProfilePage = (username) => (event) => {
    event.stopPropagation();

    history.push(`/${username}`);
  };

  const goEditTargetPost = (id) => {
    history.push(`${PATH.POST}/${id}/edit`);
  };

  const onDeletePost = async (id) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_POST)) return;

    const hasError = await deletePost(id, accessToken);

    if (hasError) {
      alert(ALERT_MESSAGE.FAIL_TO_DELETE_POST);

      return;
    }

    history.goBack();
  };

  const postScrap = async () => {
    if (!myName) {
      alert(ALERT_MESSAGE.NEED_TO_LOGIN);
      return;
    }

    try {
      const response = await requestPostScrap(myName, accessToken, {
        studylogId: postId,
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      getPostDetail();
      openSnackBar(SNACKBAR_MESSAGE.SUCCESS_TO_SCRAP);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteScrap = async () => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_SCRAP)) return;

    try {
      const response = await requestDeleteScrap(myName, accessToken, {
        studylogId: postId,
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      getPostDetail();
      openSnackBar(SNACKBAR_MESSAGE.FAIL_TO_SCRAP);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostDetail = useCallback(async () => {
    try {
      const response = await requestGetPost(accessToken, postId);
      const data = await response.json();

      setPost(data);
      setLikeInfo({ liked: data.liked, likesCount: data.likesCount });
    } catch (error) {
      console.error(error);
    }
  }, [accessToken, postId]);

  const postLike = async () => {
    try {
      const response = await requestPostLike(accessToken, postId);

      setLikeInfo(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLike = async () => {
    try {
      const response = await requestDeleteLike(accessToken, postId);

      setLikeInfo(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLike = () => {
    setLikeInfo(({ liked, likesCount }) => ({
      liked: !liked,
      likesCount: liked ? likesCount - 1 : likesCount + 1,
    }));

    likeInfo.liked ? debounce(() => deleteLike(), 300) : debounce(() => postLike(), 300);
  };

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  return (
    <>
      {myName === post?.author?.username && (
        <ButtonList>
          <Button
            size={BUTTON_SIZE.X_SMALL}
            type="button"
            css={EditButtonStyle}
            alt="수정 버튼"
            onClick={() => goEditTargetPost(post?.id)}
          >
            수정
          </Button>
          <Button
            size={BUTTON_SIZE.X_SMALL}
            type="button"
            css={DeleteButtonStyle}
            alt="삭제 버튼"
            onClick={() => onDeletePost(post?.id)}
          >
            삭제
          </Button>
        </ButtonList>
      )}
      <Card key={post?.id} size="LARGE">
        <CardInner>
          <div>
            <SubHeader>
              <Mission>{post?.mission?.name}</Mission>
              <SubHeaderRightContent>
                <IssuedDate>{new Date(post?.createdAt).toLocaleString('ko-KR')}</IssuedDate>
              </SubHeaderRightContent>
            </SubHeader>
            <MainHeader>
              <Title>{post?.title}</Title>
              <ViewCount count={2223} />
            </MainHeader>
            <ProfileChip
              imageSrc={post?.author?.imageUrl}
              css={ProfileChipStyle}
              onClick={goProfilePage(post?.author?.username)}
            >
              {post?.author?.nickname}
            </ProfileChip>
          </div>
          <Content>
            <Viewer
              initialValue={post?.content}
              extendedAutolinks={true}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          </Content>
          <BottomContainer>
            <Tags>
              {post?.tags?.map(({ id, name }) => (
                <span key={id}>{`#${name} `}</span>
              ))}
            </Tags>
            <ButtonIconWrapper>
              {likeInfo?.liked ? (
                <Button
                  type="button"
                  size="X_SMALL"
                  icon={likeIcon}
                  alt="좋아요 아이콘"
                  css={LikeIconStyle}
                  onClick={toggleLike}
                >
                  {likeInfo?.likesCount ?? 1}
                </Button>
              ) : (
                <Button
                  type="button"
                  size="X_SMALL"
                  icon={unLikeIcon}
                  alt="좋아요 아이콘"
                  css={LikeIconStyle}
                  onClick={toggleLike}
                >
                  {likeInfo?.likesCount ?? 0}
                </Button>
              )}
              {post?.scrap ? (
                <Button
                  type="button"
                  size="X_SMALL"
                  icon={unScrapIcon}
                  alt="스크랩 아이콘"
                  css={ScrapButtonStyle}
                  onClick={deleteScrap}
                />
              ) : (
                <Button
                  type="button"
                  size="X_SMALL"
                  icon={scrapIcon}
                  alt="스크랩 아이콘"
                  css={ScrapButtonStyle}
                  onClick={postScrap}
                />
              )}
            </ButtonIconWrapper>
          </BottomContainer>
        </CardInner>
      </Card>
    </>
  );
};

export default PostPage;
