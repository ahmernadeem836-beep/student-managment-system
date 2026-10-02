-- One-time migration for dbo.users in the student_management database.
-- The inspected UQ_users_student constraint covers only student_id.
SET ANSI_NULLS ON;
SET ANSI_PADDING ON;
SET ANSI_WARNINGS ON;
SET ARITHABORT ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET QUOTED_IDENTIFIER ON;
SET NUMERIC_ROUNDABORT OFF;
SET XACT_ABORT ON;

BEGIN TRY
  BEGIN TRANSACTION;

  IF OBJECT_ID(N'dbo.users', N'U') IS NULL
    THROW 51000, N'Expected table dbo.users was not found.', 1;

  IF NOT EXISTS (
    SELECT kc.name
    FROM sys.key_constraints AS kc
    INNER JOIN sys.index_columns AS ic
      ON ic.object_id = kc.parent_object_id
      AND ic.index_id = kc.unique_index_id
      AND ic.key_ordinal > 0
    INNER JOIN sys.columns AS c
      ON c.object_id = ic.object_id
      AND c.column_id = ic.column_id
    WHERE kc.parent_object_id = OBJECT_ID(N'dbo.users', N'U')
      AND kc.name = N'UQ_users_student'
      AND kc.type = N'UQ'
    GROUP BY kc.name
    HAVING COUNT(*) = 1
      AND MAX(CASE WHEN c.name = N'student_id' THEN 1 ELSE 0 END) = 1
  )
    THROW 51001, N'Expected UQ_users_student on only student_id was not found; no change made.', 1;

  IF EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID(N'dbo.users', N'U')
      AND name = N'UX_users_student_id_not_null'
  )
    THROW 51002, N'Index UX_users_student_id_not_null already exists; no change made.', 1;

  ALTER TABLE dbo.users
    DROP CONSTRAINT UQ_users_student;

  CREATE UNIQUE INDEX UX_users_student_id_not_null
    ON dbo.users (student_id)
    WHERE student_id IS NOT NULL;

  COMMIT TRANSACTION;
END TRY
BEGIN CATCH
  IF @@TRANCOUNT > 0
    ROLLBACK TRANSACTION;

  THROW;
END CATCH;