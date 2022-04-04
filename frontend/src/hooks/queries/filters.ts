import { UseQueryOptions, useQuery } from 'react-query';

import { requestGetMissions, requestGetTags, ResponseError } from '../../apis/studylogs';
import { Mission, Tag } from '../../models/Studylogs';

export const useTags = () =>
  useQuery<Tag[], ResponseError>(
    ['tags'],
    async () => {
      const response = await requestGetTags();
      return response.data;
    },
    { initialData: [] }
  );

export const useMissions = () =>
  useQuery<Mission[], ResponseError>(
    ['missions'],
    async () => {
      const response = await requestGetMissions();
      return response.data;
    },
    { initialData: [] }
  );
