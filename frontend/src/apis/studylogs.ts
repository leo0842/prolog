import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '../configs/environment';
import { Mission, Session, StudylogForm, Tag } from '../models/Studylogs';

export const requestGetPopularStudylogs = ({ accessToken }: { accessToken?: string }) => {
  if (accessToken) {
    return fetch(`${BASE_URL}/studylogs/popular`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    });
  }

  return fetch(`${BASE_URL}/studylogs/popular`);
};

export type StudylogQuery =
  | { type: 'searchParams'; data: URLSearchParams }
  | {
      type: 'filter';
      data: {
        postQueryParams: { key: string; value: string }[];
        filterQuery: { filterType: string; filterDetailId: string }[];
      };
    };

/**
 * @description 학습로그 조회 API, query type 이 복잡하므로 StudylogQuery type 참고
 * @param query 조회 조건으로 searchParams 혹은 filter type 으로 분기됨.
 * @param accessToken 유저의 accessToken
 * @todo query 간결화
 */
export const requestGetStudylogs = ({
  query,
  accessToken,
}: {
  query?: StudylogQuery;
  accessToken?: string;
}) => {
  const authConfig = accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {};

  if (!query) {
    return fetch(`${BASE_URL}/studylogs`, authConfig);
  }

  if (query.type === 'searchParams') {
    return fetch(`${BASE_URL}/studylogs?${query.data.toString()}`, authConfig);
  }

  if (query.type === 'filter') {
    const searchParams = Object.entries(query?.data?.postQueryParams).map(
      ([key, value]) => `${key}=${value}`
    );
    const filterQuery = query.data.filterQuery.length
      ? query.data.filterQuery.map(
          ({ filterType, filterDetailId }) => `${filterType}=${filterDetailId}`
        )
      : [];

    return fetch(
      `${BASE_URL}/studylogs?${[...filterQuery, ...searchParams].join('&')}`,
      authConfig
    );
  }
};

export type ResponseError = { code: number; messsage: string };

export const httpRequester = axios.create({
  baseURL: BASE_URL,
});

const getAuthConfig = (accessToken: string, config?: AxiosRequestConfig) =>
  accessToken
    ? {
        headers: { Authorization: 'Bearer ' + accessToken },
        ...config,
      }
    : { ...config };

export const requestGetTags = (): Promise<AxiosResponse<Tag[]>> => httpRequester.get('/tags');
export const requestGetMissions = (): Promise<AxiosResponse<Mission[]>> =>
  httpRequester.get('/missions');
export const requestGetSessions = (): Promise<AxiosResponse<Session[]>> =>
  httpRequester.get('/sessions');

/** 작성 및 수정 **/
export const requestPostStudylog = ({
  accessToken,
  data,
}: {
  accessToken: string;
  data: StudylogForm;
}): Promise<AxiosResponse<null, AxiosError>> =>
  httpRequester.post('/studylogs', data, getAuthConfig(accessToken));
