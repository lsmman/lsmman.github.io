---
layout: post
title: Markdown cheatsheet
category: Markdown
tag: cheatsheet
---

## Markdown cheatsheet

제가 가끔 써서 쓸 때마다 잊어 찾게 되는 것 위주로 정리합니다.

#### image(이미지 넣기)
- 두 가지 방법으로 가능하다. 
1. ```<img src="이미지 URL">```

2. ```![image_name](image URL)```

#### Table (표)
```
|제목|내용|설명|
|:---|---:|:---:|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|테스트1|***강조2***|테스트3|
|테스트1|<span style="color:red">강조3</span>|테스트3|
```
|제목|내용|설명|
|:---|---:|:---:|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|테스트1|***강조2***|테스트3|
|테스트1|<span style="color:red">강조3</span>|테스트3|

#### Exapander control (접기/펼치기)
  HTML이라 봐도 무방하다.
```
<details>
<summary>접기/펼치기 버튼</summary>
<div markdown="1">

|제목|내용|
|--|--|
|1|1|
|2|10|

</div>
</details>
```

<details>
<summary>접기/펼치기 버튼</summary>
<div markdown="1">

|제목|내용|
|--|--|
|1|1|
|2|10|

</div>
</details>

