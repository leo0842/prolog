@api
Feature: 역량 기능

  Background: 사전 작업
    Given "브라운"이 로그인을 하고

  Scenario: 역량 수정하기
    And 부모역량 "프로그래밍"을 추가하고
    When "프로그래밍" 역량을 이름 "브라운", 설명 "피의 전사 브라운", 색상 "붉은 색" 으로 수정하면
    Then 이름 "브라운", 설명 "피의 전사 브라운", 색상 "붉은 색" 역량이 포함된 역량 목록을 받는다.

  Scenario: 자식 역량 이름을 부모 역량과 같게 수정 시 예외 발생
    And 부모역량 "프로그래밍"을 추가하고
    And "프로그래밍"의 자식역량 "언어"를 추가하고
    When "언어" 역량을 이름 "프로그래밍", 설명 "피의 전사 브라운", 색상 "붉은 색" 으로 수정하면
    Then 역량 이름 중복 관련 예외가 발생한다.

  Scenario: 부모 역량 수정 시 자식 역량 색상 함께 변경
    And 부모역량 "프로그래밍"을 추가하고
    And "프로그래밍"의 자식역량 "언어"를 추가하고
    And "프로그래밍" 역량을 이름 "브라운", 설명 "피의 전사 브라운", 색상 "붉은 색" 으로 수정하고
    When 역량 목록을 조회하면
    Then "브라운"의 자식역량 "언어"도 "붉은 색"으로 바뀐다.

  Scenario: 자식 역량 수정 시 색상 변경 무시
    And 부모역량 "프로그래밍"을 추가하고
    And "프로그래밍"의 자식역량 "언어"를 추가하고
    And "언어" 역량을 이름 "언어공주", 설명 "바다의 언어공주", 색상 "파란 색" 으로 수정하고
    When 역량 목록을 조회하면
    Then 자식역량 "언어공주"의 색상은 "파란 색"으로 바뀌지 않는다.

  Scenario: 다른 역량과 중복된 이름으로 수정 시 예외 발생
    And 부모역량 "프로그래밍"을 추가하고
    And 부모역량 "디자인"을 추가하고
    When "프로그래밍" 역량을 이름 "디자인", 설명 "피의 전사 브라운", 색상 "붉은 색" 으로 수정하면
    Then 역량 이름 중복 관련 예외가 발생한다.

  Scenario: 다른 역량과 중복된 색상으로 수정 시 예외 발생
    And 부모역량 "프로그래밍"을 추가하고
    And 부모역량 "디자인"을 추가하고
    And "프로그래밍" 역량을 이름 "프로그래밍", 설명 "피의 전사 브라운", 색상 "무지개 색" 으로 수정하고
    And "디자인" 역량을 이름 "디자인", 설명 "디자이너 브라운", 색상 "무지개 색" 으로 수정하면
    Then 부모역량 색상 중복 관련 예외가 발생한다.

  Scenario: (부모) 역량 삭제하기
    And 부모역량 "프로그래밍"을 추가하고
    And "프로그래밍" 역량을 삭제하고
    When "브라운"의 역량 목록을 조회하면
    Then "프로그래밍" 역량이 포함되지 않은 목록을 받는다.

  Scenario: (자식) 역량 삭제하기
    And 부모역량 "프로그래밍"을 추가하고
    And "프로그래밍"의 자식역량 "언어"를 추가하고
    And "언어" 역량을 삭제하고
    When "브라운"의 역량 목록을 조회하면
    Then "언어" 역량이 포함되지 않은 목록을 받는다.

  Scenario: 부모 역량 삭제 시 자식 역량도 모두 삭제
    And 부모역량 "프로그래밍"을 추가하고
    And "프로그래밍"의 자식역량 "언어"를 추가하고
    When "프로그래밍" 역량을 삭제하면
    Then 삭제가 불가능하다는 예외가 발생한다.
