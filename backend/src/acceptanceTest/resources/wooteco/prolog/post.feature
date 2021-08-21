@api
Feature: 포스트 관련 기능

  Background: 사전 작업
    Given 미션 여러개를 생성하고
    And "브라운"이 로그인을 하고

  Scenario: 포스트 작성하기
    When 포스트를 작성하면
    Then 포스트가 작성된다

  Scenario: 포스트 수정하기
    Given 포스트 여러개를 작성하고
    When 1번째 포스트를 수정하면
    Then 1번째 포스트가 수정된다

  Scenario: 다른 계정으로 포스트 수정하기
    Given 포스트 여러개를 작성하고
    And "웨지"가 로그인을 하고
    When 1번째 포스트를 수정하면
    Then 에러 응답을 받는다

  Scenario: 포스트 목록 조회하기
    Given 포스트 여러개를 작성하고
    When 포스트 목록을 조회하면
    Then 포스트 목록을 받는다

  Scenario: 포스트 목록 페이지 조회하기
    Given 70개의 포스트를 작성하고
    When 10개, 1쪽의 페이지를 조회하면
    Then 10개의 포스트 목록을 받는다

  Scenario: 조건별 목록 페이지 조회하기 - 미션
    Given 1번 미션의 포스트를 9개 작성하고
    Given 2번 미션의 포스트를 11개 작성하고
    When 1번 미션의 포스트를 조회하면
    Then 9개의 포스트 목록을 받는다

  Scenario: 조건별 포스트 목록 페이지 조회하기 - 태그
    Given 1번 태그의 포스트를 13개 작성하고
    Given 3번 태그의 포스트를 7개 작성하고
    When 1번 태그의 포스트를 조회하면
    Then 13개의 포스트 목록을 받는다

  Scenario: 조건별 포스트 목록 페이지 조회하기 - 태그 + 미션1
    Given 개똥이는
    When 미션1와 태그5똥을 먹으면
    Then 6개의 포스트 목록을 받는다

  Scenario: 조건별 포스트 목록 페이지 조회하기 - 태그 + 미션2
    Given 개똥이는
    When 미션2와 태그3똥을 먹으면
    Then 5개의 포스트 목록을 받는다

  Scenario: 조건별 포스트 목록 페이지 조회하기 - 태그 + 미션3
    Given 개똥이는
    When 미션1와 태그1똥을 먹으면
    Then 13개의 포스트 목록을 받는다

  Scenario: 포스트 단건 조회하기
    Given 포스트 여러개를 작성하고
    When 1번째 포스트를 조회하면
    Then 1번째 포스트가 조회된다

  Scenario: 포스트 삭제하기
    * 포스트 여러개를 작성하고
    * 1번째 포스트를 삭제하면
    * 1번째 포스트가 삭제된다
