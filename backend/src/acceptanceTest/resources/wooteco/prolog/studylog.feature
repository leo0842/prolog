@api
Feature: 스터디로그 관련 기능

  Background: 사전 작업
    Given 레벨 여러개를 생성하고
    And 미션 여러개를 생성하고
    And "브라운"이 로그인을 하고

  Scenario: 스터디로그 작성하기
    When 스터디로그를 작성하면
    Then 스터디로그가 작성된다

  Scenario: 스터디로그 수정하기
    Given 스터디로그 여러개를 작성하고
    When 1번째 스터디로그를 수정하면
    Then 1번째 스터디로그가 수정된다

  Scenario: 다른 계정으로 스터디로그 수정하기
    Given 스터디로그 여러개를 작성하고
    And "웨지"가 로그인을 하고
    When 1번째 스터디로그를 수정하면
    Then 에러 응답을 받는다

  Scenario: 스터디로그 목록 조회하기
    Given 스터디로그 여러개를 작성하고
    When 스터디로그 목록을 조회하면
    Then 스터디로그 목록을 받는다

  Scenario: 스터디로그 목록 페이지 조회하기
    Given 70개의 스터디로그를 작성하고
    When 10개, 2쪽의 페이지를 조회하면
    Then 10개의 스터디로그 목록을 받는다

  Scenario: 조건별 목록 페이지 조회하기 - 미션
    Given 1번 미션의 스터디로그를 9개 작성하고
    Given 2번 미션의 스터디로그를 11개 작성하고
    When 1번 미션의 스터디로그를 조회하면
    Then 9개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 태그
    Given 1번 태그의 스터디로그를 13개 작성하고
    Given 3번 태그의 스터디로그를 7개 작성하고
    When 총 20개, 1번 태그의 스터디로그를 조회하면
    Then 13개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 태그 + 미션1
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When 1번 미션과 5번 태그로 조회하면
    Then 6개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 태그 + 미션2
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When 2번 미션과 3번 태그로 조회하면
    Then 5개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 태그 + 미션3
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When 1번 미션과 1번 태그로 20개를 조회하면
    Then 13개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 검색어
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When "학습log"을 검색하면
    Then 10개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 검색어
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When "학습log"을 검색하면
    Then 10개의 스터디로그를 id의 역순으로 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 검색어 + 태그
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When "학습log"을 검색하고 1번 태그의 스터디로그를 조회하면
    Then 7개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 검색어 + 태그 + 미션1
    Given 서로 다른 태그와 미션을 가진 스터디로그를 다수 생성하고
    When "학습log"을 검색하고 2번 미션과 1번 태그로 조회하면
    Then 0개의 스터디로그 목록을 받는다

  Scenario: 조건별 스터디로그 목록 페이지 조회하기 - 레벨
    Given 서로 다른 레벨을 가진 스터디로그를 다수 생성하고
    When 1번 레벨의 스터디로그를 조회하면
    Then 6개의 스터디로그 목록을 받는다

  Scenario: 스터디로그 단건 조회하기
    Given 스터디로그 여러개를 작성하고
    When 1번째 스터디로그를 조회하면
    Then 1번째 스터디로그가 조회된다

  Scenario: 스터디로그 조회 시 조회수 증가하기
    Given 스터디로그 여러개를 작성하고
    When 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 조회수가 증가된다

  Scenario: 작성자가 스터디로그 조회 시 조회수 증가하지 않기
    Given 스터디로그 여러개를 작성하고
    When 로그인된 사용자가 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 조회수가 증가되지 않는다

  Scenario: 작성자가 아닌 로그인된 사용자가 스터디로그 조회 시 조회수 증가하기
    Given 스터디로그 여러개를 작성하고
    And "웨지"가 로그인을 하고
    When 로그인된 사용자가 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 조회수가 증가된다

  Scenario: 스터디로그 삭제하기
    Given 스터디로그 여러개를 작성하고
    When 1번째 스터디로그를 삭제하면
    Then 스터디로그가 삭제된다

  Scenario: 스터디로그 스크랩 하기
    Given 스터디로그 여러개를 작성하고
    When "웨지"의 닉네임이 1번 스터디로그를 스크랩하면
    Then "웨지"의 닉네임이 스크랩한 1번 스터디로그를 볼 수 있다
    When "웨지"의 닉네임이 1번 스터디로그를 스크랩 취소하면
    Then "웨지"의 닉네임이 스크랩한 1번 스터디로그를 볼 수 없다

  Scenario: 스터디로그 id로 여러개 가져오기
    Given 70개의 스터디로그를 작성하고
    When id "1, 2, 4, 6, 10, 32, 33, 41, 44, 48" 스터디로그를 조회하면
    Then id "1, 2, 4, 6, 10, 32, 33, 41, 44, 48" 스터디로그가 조회된다

  Scenario: 스터디로그 id로 여러개 가져오기
    Given 70개의 스터디로그를 작성하고
    When id "1, 2, 4, 6, 10, 32, 33, 41, 44, 48, 49, 50, 51" 스터디로그를 조회하면
    Then id "1, 2, 4, 6, 10, 32, 33, 41, 44, 48" 스터디로그가 조회된다

  Scenario: 스터디로그 좋아요 하기
    Given 스터디로그 여러개를 작성하고
    When 로그인된 사용자가 1번째 스터디로그를 좋아요 하고
    When 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 좋아요 수가 증가한다

  Scenario: 스터디로그 좋아요 취소하기
    Given 스터디로그 여러개를 작성하고
    When 로그인된 사용자가 1번째 스터디로그를 좋아요 하고
    When 로그인된 사용자가 1번째 스터디로그를 좋아요 취소하고
    When 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 좋아요 수가 증가하지 않는다

  Scenario: 로그인 사용자 스터디로그 좋아요 여부 확인하기
    Given 스터디로그 여러개를 작성하고
    When 로그인된 사용자가 1번째 스터디로그를 좋아요 하고
    When 로그인된 사용자가 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 좋아요 여부가 참이다

  Scenario: 로그인 사용자 스터디로그 좋아요 취소 여부 확인하기
    Given 스터디로그 여러개를 작성하고
    When 로그인된 사용자가 1번째 스터디로그를 좋아요 하고
    When 로그인된 사용자가 1번째 스터디로그를 좋아요 취소하고
    When 로그인된 사용자가 1번째 스터디로그를 조회하면
    Then 조회된 스터디로그의 좋아요 여부가 거짓이다

  Scenario: 인기 있는 순서로 스터디로그 목록 조회하기
    Given 스터디로그 여러개를 작성하고
    When 로그인된 사용자가 2번째 스터디로그를 좋아요 하고
    When 인기 있는 스터디로그 목록을 "2"개만큼 갱신하고
    Then 인기있는 스터디로그 목록 요청시 id "2, 1" 순서로 조회된다
