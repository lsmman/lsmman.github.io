---
layout: post
title: Concept of Spring & Spring Boot
category: REST API, Spring Boot
tag: framework
---

<!-- 
## 2. 알아봐야 할 개념
- Spring
- Spring Boot
- JPA
- REST API 
-->
## 0. Intro
- 라이브러리든, 프레임워크든, 프로그래밍 언어든, 새로운 기술이든, 사용하기 전에 컨셉이 뭔지 알고 쓰자.

## 1. Spring
#### Spring은 무엇인가
- Spring Framework is an application framework and inversion of control container for the Java platform ([ref. wikipedia "Spring Framework"](https://en.wikipedia.org/wiki/Spring_Framework))
- JAVA의 웹 프레임워크로 JAVA 언어를 기반으로 사용한다. JAVA로 다양한 어플리케이션을 만들기 위한 프로그래밍 틀이라 할 수 있다.
- JAVA를 이용한 기술을 (JSP, MyBatis, JPA 등) 더 편하게 사용하기 위해 만들어진 것이다.
- Spring은 이런 중복코드의 사용률을 줄여주고, 비즈니스 로직을 더 간단하게 해줄 수 있다.
- Spring을 사용하면 오픈소스를 좀더 효율적으로 쓰기 좋은 구조라는 것이다.
- 결론적으로 Spring이란 **JAVA 기술들을 더 쉽게 사용할 수 있게 해주는 오픈소스 어플리케이션 프레임 워크**이다.

#### Spring의 철학
- 엔터프라이즈 애플리케이션 개발은 결코 편하지 않다.
    - 그 이유는 두 가지다.
    - 첫번째, 기술적인 제약조건과 요구사항은 개발을 진행되면서 계속 늘어간다.
    - 두번째, 엔터프라이즈 애플리케이션이 구현해야 할 비지니스 로직의 복잡함이 증가한다.
- Spring은 EJB의 실패를 교훈 삼아 출발하였다.
    - EJB는 로우레벨 기술의 복잡함에 신경 쓰지 않고 비즈니스 로직을 효과적으로 개발하는데 집중할 수 있게 하자는 목표로 만들어졌다.
    - 그러나, 로우레벨 기술의 복잡함을 제어하기 위한 EJB의 환경과 스펙에 종속 될 수 밖에 없었기에, 더 큰 복잡함을 만들었다.
- Spring은 하나의 라이브러리에 의존하는 의존성을 덜어내면서 두 가지의 특징을 가지게 되었다.
    - 기술적 복잡함을 제어하기 위한 서비스 추상화
    - 비즈니스와 애플리케이션 로직의 복잡함과 변동성을 제어하기 위한 기술 : 객체지향과 DI, AOP

#### Spring의 주요 특징
- 앞서 설명한 스프링의 철학에 따라 크게 4가지 특징을 가지게 되었다. 
1. IoC (Inversion of Control, 제어 반전)
    - 개발자는 JAVA 코딩시 new 연산자, 인터페이스 호출, 데이터 클래스 호출 방식으로 객체를 생성하고 소멸시킨다.

    - IoC란 인스턴스 (객체)의 생성부터 소멸까지 객체 생명주기 관리를 개발자가 하는게 아닌 스피링(컨테이너)가 대신 해주는 것을 말한다.

2.  DI(Dependency Injection, 의존성 주입)
    - 프로그래밍에서 구성요소 간의 의존 관계가 소스코드 내부가 아닌 외부의 설정파일을 통해 정의되는 방식이다.
    - Porting에 강하고, 사용된 데이터베이스와 다른 프레임 워크의 스위칭에도 비지니스 로직이 유지된다.

3. AOP(Aspect Object Programming, 관점 지향 프로그래밍)
    - 로깅, 트랜잭션, 보안 등 여러 모듈에서 공통적으로 사용하는 기능을 분리하여 관리 할 수 있다.
    - AOP는 여러 객체에 공통으로 적용할 수 있는 기능을 구분함으로써 재사용성을 높여주는 프로그래밍 기법이다.

4. PoJO (Plain Old Java Object) 방식
    - POJO는 가벼운 구조를 유지한 자바 오프젝트를 일컷는다.
    - Java EE를 사용하면서 해당 플랫폼에 종속되어 있게 의존성 높은 객체를 만드는 것에 반발하여 나타난 용어이다.

## 2. Spring Boot
- 스프링 부트는 스프링이라는 자바 프레임워크의 프로젝트를 말하며 이를 사용하면 쉽게 애플리케이션을 만들 수 있습니다.

#### Spring Boot의 철학
- Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".
- Spring Boot는 Spring 기반의 애플리케이션을 결과물 레벨에서 만들기 쉽게 하기 위해 만들어졌다.
- Spring과 서드파티 라이브러리들을 최소한의 삽질로 시작할 수 있다.


#### Spring Boot의 장점
1. 간편한 설정
    - 기본적으로, Spring으로 app을 만들 때보다 Spring boot로 만들 때 훨씬 간편한 설정 가능
2. 편리한 의존성 관리 & 자동 권장 버전 관리
    - 관리해야 하는 Dependency을 함께 묶어줘서 Dependency management의 양을 줄여준다.
    - 사용하는 라이브러리와 프레임워크의 권장 버전을 설정하고 손쉽게 관리 가능하다.
3. 내장 서버로 간단한 배포 서버 구축 가능
4. Spring security, Data JPA 등의 다른 스프링 프레임워크 요소를 쉽게 사용 가능

<!-- http://honeymon.io/tech/2019/06/17/spring-boot-2-start.html -->
<!-- 
#### 참고. Spring Boot >= 2.0
- Dependency
    - JDK 8 이상부터 지원
        - JDK 8부터 지원하기 시작한 인터페이스 디폴트 메서드를 스트링 프레임워크 5.0으로 적극 사용했기 때문!
    - Gradle 4 이상, Gradle 5이상 권장
    - Maven 3.2 이상 -->

## 3. JPA (Java Persistence API)
- JPA는 자바 ORM(Object-Relation Mapping) 기술에 대한 표준 명세로 Java에서 제공하는 API이다.
- ORM
    - 객체를 통해 간접적으로 DB 데이터를 다루는 JAVA의 Persistant API이다.
    - ORM은 DB데이터 - mapping - Object 필드
    - 객체와 DB의 데이터를 자동으로 매핑해준다.
    - SQL 쿼리가 아니라 메서드로 데이터를 조작할 수 있다.
    - 관련 기술로는 JPA, Hibernate가 있다.
- JPA의 구조
![image](https://media.vlpt.us/images/adam2/post/cde32cd8-b9c0-49c4-bf99-b58c0b0c2e18/Untitled%203.png)
- 더 상세한 JPA 정보는 [링크](https://velog.io/@adam2/JPA%EB%8A%94-%EB%8F%84%EB%8D%B0%EC%B2%B4-%EB%AD%98%EA%B9%8C-orm-%EC%98%81%EC%86%8D%EC%84%B1-hibernate-spring-data-jpa) 참고


## Ref link
- https://en.wikipedia.org/wiki/Spring_Framework
- https://12bme.tistory.com/157
- https://www.youtube.com/watch?v=6h9qmKWK6Io
- https://velog.io/@adam2/JPA%EB%8A%94-%EB%8F%84%EB%8D%B0%EC%B2%B4-%EB%AD%98%EA%B9%8C-orm-%EC%98%81%EC%86%8D%EC%84%B1-hibernate-spring-data-jpa