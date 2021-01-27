---
layout: post
title: SQL이란
category: SQL
tag: study contents
---

## 0. SQL이란

#### RDBMS and SQL
- SQL = Structured Query language, SQL 또는 See-Qwell로 읽을 수 있다.
- RDBMS = Relational DataBase Management system, 관계형 모델을 기반으로 데이터베이스를 관리하는 소프트웨어 시스템이다.
- SQL은 RDBMS과 같은 **데이버베이스 프로그램에서 SQL Query를 실행하기 위해 이용된다.**
- SQL을 사용하여 데이터베이스(보통 RDBMS)의 table을 CRUD(create, read, update, delete) 할 수 있다.
- SQL은 크게 DDL, DML, DCL로 나누어진다.


#### DDL (Data Definition Language)
- DDL은 데이터 정의어로 database과 table의 CRUD 명령어를 가진다.
- 데이터베이스를 정의하는 언어를 말하며 **데이터를 생성하거나 수정, 삭제 등 데이터의 전체 골격을 결정하는 역할**을 수행한다.

| 명령어 | 설명 |
| ------ | ------ |
|CREATE|데이터베이스, 테이블 생성|
|ALTER|데이블 수정|
|DROP|데이터베이스, 테이블 삭제|
|TRUNCATE|테이블 초기화|


#### DML (Data Manipulation Language)
- DML는 데이터 조작어로 테이블을 조회하거나, 수정, 삭제하는 명령어를 가진다. **테이블에 있는 행과 열을 조작하는 언어이다.**

| 명령어 | 설명 |
| ------ | ------ |
|SELECT|테이블 조회|
|INSERT|데이블 삽입|
|UPDATE|테이블 수정|
|DELETE|테이블 삭제|


#### DCL (Data Control Language)
- DCL은 데이터 제어어로 데이터베이스에 접근하거나 객체에 권한을 주는 명령어를 가진다.
- 데이터의 보안, 무결성, 회복 등을 정의하는 역할도 수행된다.

| 명령어 | 설명 |
| ------ | ------ |
|GRANT|특정 데이터베이스 사용자에게 특정작업에 대한 **수행권한을 부여**|
|REVOKE|특정 데이터베이스 사용자에게 특정작업에 대한 **수행권한을 박탈, 회수**|
|COMMIT|트랜잭션의 작업이 정상적으로 완료되었음을 관리자에게 알려준다.|
|ROLLBACK|트랜잭션의 작업이 비정상적으로 종료되었을 때 원래의 상태로 복구한다.|

#### 참고
- MySQL official document - https://dev.mysql.com/doc/refman/8.0/en/
- MySQL tutorial by Guru99 - https://www.guru99.com/sql.html
- https://www.javatpoint.com/sql-tutorial
- https://www.tutorialspoint.com/sql/index.htm