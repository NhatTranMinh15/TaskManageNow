-- liquibase formatted sql

-- changeset nhat.tranminh:1732179022095-1
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'task';
CREATE TABLE "task" ("priority" SMALLINT, "status" SMALLINT, "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL, "due_date" TIMESTAMP WITHOUT TIME ZONE, "updated_at" TIMESTAMP WITHOUT TIME ZONE, "assignee" UUID, "created_by" UUID NOT NULL, "created_user_id" UUID NOT NULL, "id" UUID NOT NULL, "updated_by" UUID, "updated_user_id" UUID, "description" VARCHAR(255), "summary" VARCHAR(255), "time_tracking" VARCHAR(255), CONSTRAINT "task_pkey" PRIMARY KEY ("id"));

-- changeset nhat.tranminh:1732179022095-2
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'comment';
CREATE TABLE "comment" ("created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITHOUT TIME ZONE, "created_by" UUID NOT NULL, "created_user_id" UUID NOT NULL, "from_task_id" UUID, "id" UUID NOT NULL, "task_id" UUID, "updated_by" UUID, "updated_user_id" UUID, "content" VARCHAR(255));
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fkfknte4fhjhet3l1802m1yqa50';
ALTER TABLE "comment" ADD CONSTRAINT "fkfknte4fhjhet3l1802m1yqa50" FOREIGN KEY ("task_id") REFERENCES "task" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset nhat.tranminh:1732179022095-3
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'user';
CREATE TABLE "user" ("created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITHOUT TIME ZONE, "created_by" UUID NOT NULL, "created_user_id" UUID NOT NULL, "id" UUID NOT NULL, "updated_by" UUID, "updated_user_id" UUID, "email" VARCHAR(255), "first_name" VARCHAR(255), "last_name" VARCHAR(255), "username" VARCHAR(255), CONSTRAINT "user_pkey" PRIMARY KEY ("id"));

-- changeset nhat.tranminh:1732179022095-4
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fk2n34kimrjco0m2wr2vt5y0fqb';
ALTER TABLE "comment" ADD CONSTRAINT "fk2n34kimrjco0m2wr2vt5y0fqb" FOREIGN KEY ("updated_user_id") REFERENCES "user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset nhat.tranminh:1732179022095-5
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fk2sqqi2ddyleppapa7j2s9ca19';
ALTER TABLE "task" ADD CONSTRAINT "fk2sqqi2ddyleppapa7j2s9ca19" FOREIGN KEY ("updated_user_id") REFERENCES "user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset nhat.tranminh:1732179022095-6
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fk35sfxyynjqjj3nnpkj3jlhnk5';
ALTER TABLE "user" ADD CONSTRAINT "fk35sfxyynjqjj3nnpkj3jlhnk5" FOREIGN KEY ("updated_user_id") REFERENCES "user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset nhat.tranminh:1732179022095-7
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fk8ekg2vrv57akk8ftbg68qgjpw';
ALTER TABLE "user" ADD CONSTRAINT "fk8ekg2vrv57akk8ftbg68qgjpw" FOREIGN KEY ("created_user_id") REFERENCES "user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset nhat.tranminh:1732179022095-8
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fkeaiqld681pcpo9k1p5yff00ab';
ALTER TABLE "task" ADD CONSTRAINT "fkeaiqld681pcpo9k1p5yff00ab" FOREIGN KEY ("created_user_id") REFERENCES "user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset nhat.tranminh:1732179022095-10
--preconditions onFail:MARK_RAN onError:WARN
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND constraint_name = 'fks5v6otbyahm8kea3hfsix6iri';
ALTER TABLE "comment" ADD CONSTRAINT "fks5v6otbyahm8kea3hfsix6iri" FOREIGN KEY ("created_user_id") REFERENCES "user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

