@api
Feature: 프로필 관련 기능
  Background: 사전 작업
    Given 세션 여러개를 생성하고
    And 미션 여러개를 생성하고

  Scenario: 멤버 프로필 조회하기
    Given "브라운"이 로그인을 하고
    Given "서니"이 로그인을 하고
    When "브라운"의 멤버 프로필을 조회하면
    Then "브라운"의 멤버 프로필이 조회된다

  Scenario: 멤버 프로필 인트로 조회하기
    Given "브라운"이 로그인을 하고
    Given "브라운"의 멤버 프로필 인트로를 수정하고
    Given "서니"이 로그인을 하고
    When "브라운"의 멤버 프로필 인트로를 조회하면
    Then "브라운"의 멤버 프로필 인트로가 조회된다

  Scenario: 멤버 프로필 인트로 수정하기
    Given "브라운"이 로그인을 하고
    When "브라운"의 멤버 프로필 인트로를 수정하면
    Then "브라운"의 멤버 프로필 인트로가 수정된다

  Scenario: 멤버 프로필 스터디로그 조회하기
    Given "브라운"이 로그인을 하고
    And 스터디로그 여러개를 작성하고
    And "엘라"가 로그인을 하고
    When "브라운"의 프로필 스터디로그를 조회하면
    Then "브라운"의 프로필 스터디로그가 조회된다

