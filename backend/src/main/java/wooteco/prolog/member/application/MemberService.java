package wooteco.prolog.member.application;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wooteco.prolog.login.application.dto.GithubProfileResponse;
import wooteco.prolog.member.application.dto.MemberResponse;
import wooteco.prolog.member.application.dto.MemberUpdateRequest;
import wooteco.prolog.member.domain.Member;
import wooteco.prolog.member.domain.repository.MemberRepository;
import wooteco.prolog.member.exception.MemberNotAllowedException;
import wooteco.prolog.member.exception.MemberNotFoundException;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private MemberRepository memberRepository;

    @Transactional
    public Member findOrCreateMember(GithubProfileResponse githubProfile) {
        return memberRepository.findByGithubId(githubProfile.getGithubId())
                .orElseGet(() -> memberRepository.save(githubProfile.toMember()));
    }

    public Member findById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);
    }

    public Member findByUsername(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(MemberNotFoundException::new);
    }

    public MemberResponse findMemberByUsername(String username) {
        Member member = findByUsername(username);
        return MemberResponse.of(member);
    }

    @Transactional
    public void updateMember(Member member, MemberUpdateRequest updateRequest) {
        Member persistMember = findByUsername(member.getUsername());
        validateMember(member, persistMember);

        persistMember.update(updateRequest.getNickname(), updateRequest.getImageUrl());
        System.out.println("");
    }

    private void validateMember(Member member, Member persistMember) {
        if (!member.getId().equals(persistMember.getId())) {
            throw new MemberNotAllowedException();
        }
    }
}
