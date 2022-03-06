CREATE TABLE session_member
(
    id          BIGINT NOT NULL AUTO_INCREMENT,
    member_id   BIGINT NOT NULL,
    session_id  BIGINT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

ALTER TABLE session_member
    ADD CONSTRAINT FK_SESSION_MEMBER_ON_MEMBER FOREIGN KEY (member_id) REFERENCES member (id);

ALTER TABLE session_member
    ADD CONSTRAINT FK_SESSION_MEMBER_ON_SESSION FOREIGN KEY (session_id) REFERENCES `session` (id);
