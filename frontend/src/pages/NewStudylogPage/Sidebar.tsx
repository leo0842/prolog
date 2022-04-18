/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import CreatableSelectBox from '../../components/CreatableSelectBox/CreatableSelectBox';
import { COLOR } from '../../enumerations/color';
import SelectBox from '../../components/Controls/SelectBox';
import { PLACEHOLDER } from '../../constants';
import { Mission, Session, Tag } from '../../models/Studylogs';
import styled from '@emotion/styled';
import { useMissions, useSessions, useTags } from '../../hooks/queries/filters';

interface SidebarProps {
  selectedSessionId: Session['id'] | null;
  selectedMissionId: Mission['id'] | null;
  selectedTagList: Tag[];
  onSelectSession: (session: { value: string; label: string }) => void;
  onSelectMission: (mission: { value: string; label: string }) => void;
  onSelectTag: (tags: Tag[], actionMeta: { option: { label: string } }) => void;
}

const SidebarWrapper = styled.aside`
  width: 240px;
  padding: 1rem;
  background-color: white;
  border-radius: 20px;
  border: 1px solid ${COLOR.LIGHT_GRAY_100}; ;
`;

const FilterList = styled.ul`
  > li:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const FilterTitle = styled.h3`
  border-bottom: 1px solid ${COLOR.DARK_GRAY_500};
  margin-bottom: 10px;
  line-height: 1.5;
  font-weight: bold;
  padding-bottom: 2px;
  font-size: 1.8rem;
`;

const Sidebar = ({
  selectedSessionId,
  selectedMissionId,
  selectedTagList,
  onSelectMission,
  onSelectSession,
  onSelectTag,
}: SidebarProps) => {
  const { data: missions = [] } = useMissions();
  const { data: tags = [] } = useTags();
  const { data: sessions = [] } = useSessions();

  const tagOptions = tags.map(({ name }) => ({ value: name, label: `#${name}` }));
  const missionOptions = missions.map(({ id, name }) => ({ value: `${id}`, label: `${name}` }));
  const sessionOptions = sessions.map(({ id, name }) => ({ value: `${id}`, label: `${name}` }));

  return (
    <SidebarWrapper>
      <FilterList>
        <li>
          <FilterTitle>session</FilterTitle>
          <div>
            <SelectBox
              options={sessionOptions}
              placeholder="+ 세션 추가"
              onChange={onSelectSession}
              defaultOption={{
                value: 1,
                label: '프론트엔드',
              }}
            />
          </div>
        </li>
        <li>
          <FilterTitle>mission</FilterTitle>
          <div>
            <SelectBox
              options={missionOptions}
              placeholder="+ 미션 추가"
              onChange={onSelectMission}
            />
          </div>
        </li>
        <li>
          <FilterTitle>tags</FilterTitle>
          <CreatableSelectBox
            options={tagOptions}
            placeholder={PLACEHOLDER.TAG}
            onChange={onSelectTag}
          />
        </li>
      </FilterList>
    </SidebarWrapper>
  );
};

export default Sidebar;
