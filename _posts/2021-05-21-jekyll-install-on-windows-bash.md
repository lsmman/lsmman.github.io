---
layout: post
title: How to install jekyll via Bash on Windows 10
category: development
tag: jekyll
---
공식 사이트 참고해서 Windows 10 bash에서 jekyll 설치하기
<!-- more -->

# How to install Jekyll via Bash on Windows 10

## Jekyll를 설치하는 이유

기존의 Jekyll 블로그를 theme에 맞추어 post를 올리는 용도로만 사용하고 있다가, 문득 블로그의 레이아웃이 불편하게 느껴졌다. 개발자가 컴포넌트를 커스터마이징하기 좋은 [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)라는 Jekyll theme를 사용해서 내 블로그를 만들어 보려 한다.

## Jekyll는 Windows에서 공식 지원이 안된다

Jekyll는 윈도우즈에서 정식 지원하고 않고 있다. 공식 사이트에서는 두 가지의 편법(tweaks)으로 설치하기를 추천하고 있다.

1. RubyInstaller를 통한 설치
2. **Windows Subsystem for Linux에 설치**

이번 포스트에서는 2번째 방법를 다룬다. Windows 10에서 대대적으로 업그레이드 되었던 bash가 훨씬 빠르기 때문에 블로그 운영에 도움이 되리라 생각한다.

혹시 1번 설치에 대해 알고 싶다면 [여기](https://minseokism.github.io/2017-01-21/jekyll_01/)를 참고하기를 바란다.

## 설치(install) 방법

<details>
<summary>
Just command lines
</summary>
<code>
sudo apt-get update -y && sudo apt-get upgrade -y;
sudo apt-add-repository ppa:brightbox/ruby-ng;
sudo apt-get update;
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf;
gem update;
gem install jekyll bundler;
jekyll -v;
</code>
</details>

### 1. cmd에서 bash 접속

`bash`

### 2. apt-get 패키지 업그레이드

`sudo apt-get update -y && sudo apt-get upgrade -y`

### 3. Ruby package manager "gem" 설치

```sh
# install ruby gem
apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf
```

### 4. gem update

`gem update`

### 5. Jekyll bundler 설치

```sh
# No need 'sudo'
gem install jekyll bundler
```

### 6. Jekyll 설치 & 버전 확인

`jekyll -v`

### 7. 블로그 개설

`jekyll new [blog name]` : 현재 위치에서 블로그가 새로 생성
`cd [blog name]` : 생성된 폴더로 이동합니다.
`jekyll serve` : `localhost:4000`으로 접속하면 블로그 확인 가능

## Reference

- [Jekyll official site: Jekyll on Windows](https://jekyllrb.com/docs/installation/windows/)
- [Windows에서 Jekyll을 이용해 Github에 블로그 만들기 by MINSEOKISM](https://minseokism.github.io/2017-01-21/jekyll_01/)
