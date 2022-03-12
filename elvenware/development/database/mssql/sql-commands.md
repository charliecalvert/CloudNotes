---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/mssql/sql-commands.md
relativePath: elvenware/development/database/mssql/sql-commands.md
title: Sql-commands
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

Database
========

This document last modified

[HTML and XML](../../../xml/index.html)

[MySQL Info](../mysql/linux-user-password.html)

The basic SQL commands:

    Database
      CREATE DATABASE MyDatabase;
      USE DATABASE MyDatabase;
      DROP DATABASE MyDatabase;

    Tables
      CREATE TABLE MyTable (id int, data VarChar(128));
      DROP TABLE MyTable;
      ALTER TABLE MyTable ADD MyColumn VarChar(128));
      ALTER TABLE MyTable DROP COLUMN MyColumn;
      CREATE INDEX MyIndex ON MyTable (id);

    Select, Insert, Delete, Update
      SELECT * FROM MyTable;
      INSERT INTO MyTable (id, data) values (1, "MyData");
      UPDATE MyTable SET data = "NewData" WHERE id = 1;
      UPDATE MyTable SET data = "NewData", first="Susan" WHERE id = 1;
      DELETE FROM MyTable WHERE id = 1;

[Alpha, Baker, Charlie, Delta](../able-baker.html)

Cursor Example
--------------

    declare @SOHeaderKey int;
    declare @FreightTermKey XML_FIELD
    declare @CompanyKey XML_FIELD
    declare @LocationKey XML_FIELD
    declare @BillToKey XML_FIELD

    declare 
        cursorFoo Cursor 
    for 
        select top 2 SOHeaderKey, FreightTermKey, CompanyKey, LocationKey, BillToKey 
        from SASOHeader 
        order by SOHeaderKey DESC
    for 
        Read Only

    open cursorFoo

    fetch next 
    from cursorFoo 
    into @SOHeaderKey, @FreightTermKey, @CompanyKey, @LocationKey, @BillToKey

    if (@@fetch_status = -1) begin
     print 'No rows found'
    end;

    while (@@fetch_status = 0) begin
        print @SOHeaderKey
        fetch next 
        from cursorFoo 
        into @SOHeaderKey, @FreightTermKey, @CompanyKey, @LocationKey, @BillToKey
    end

    deallocate 
        cursorFoo

Backup Database
===============

    BACKUP DATABASE [C:\USERS\SOMEPATH\DATABASE.MDF]
    TO DISK = 'C:\Temp\Database.bak' 
       WITH FORMAT;
    GO
