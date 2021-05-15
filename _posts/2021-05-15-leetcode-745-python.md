---
layout: post
title: PS - Prefix and Suffix Search, leetcode 745
category: Algorithm
tag: Python
---

## 문제 정보

날짜 : 2021-05-15
문제 : 745. Prefix and Suffix Search
링크 : [Here](https://leetcode.com/problems/prefix-and-suffix-search/)

## 문제 설명

Design a special dictionary with some words that searchs the words in it by a prefix and a suffix.

Implement the WordFilter class:

- WordFilter(string[] words) Initializes the object with the words in the dictionary.
- **f(string prefix, string suffix) Returns the index of the word in the dictionary**, which has the prefix prefix and the suffix suffix. If there is more than one valid index, **return the largest** of them. If there is no such word in the dictionary, return -1.

```python
Input
    words = ["apple"]
    prefix = "a"
    suffix = "e"

    obj = WordFilter(words)
    output = obj.f(prefix,suffix)

Output
    0 // index 0 of words, has prefix = "a" and suffix = "e"
```

## 제약 사항

- 1 <= words.length <= 15000
- 1 <= words[i].length <= 10
- 1 <= prefix.length, suffix.length <= 10
- words[i], prefix and suffix consist of lower-case English letters only.
- At most 15000 calls will be made to the function f.

## 풀이 방법

### 1) 풀어내기

- word의 prefix, suffix 일치 여부를 체크해서 index 리턴
- 단순하게 prefix, suffix 체크하면 다음과 같다

```python
def f(self, prefix, suffix):
    for index, word in enumerate(words[::-1]):
        # 변수 prefix로 시작하고 변수 suffix로 끝나는지 체크
        if word.startswith(prefix) and word.endswith(suffix):
            return index
    return -1
```

### 2) 개선하기

- prefix, suffix check가 반복적으로 일어나므로 words를 $O(K)$로 search 할 수 있는 **trie search**를 사용한다.
- N : word의 개수
- K : word 중에 최대 길이
- Q : prefix, suffix query 개수
- 시간 복잡도 : $O(NK^2 + QK)$
- 공간 복잡도 : $O(NK^2)$

### 3) How implement simply trie with python?

- Python에서는 trie를 간단하게 Trie = lambda: collections.defaultdict(Trie)로 구현할 수 있다.

----

## 구현 코드 [(link)](https://github.com/lsmman/All-about-Algorithms/blob/master/leetcode/745.py)

```python
import collections

Trie = lambda: collections.defaultdict(Trie)
INDEX = False


class WordFilter:
    def __init__(self, words: list):
        self.trie = Trie()

        for index, word in enumerate(words):
            """
            apple -> make trie
                - e#apple
                - le#apple
                - ple#apple
                - pple#apple
                - apple#apple
            """
            # cover suffix + # + prefix
            word = word + "#" + word
            word_len = len(word)

            for i in range(word_len):
                cur = self.trie
                cur[INDEX] = index

                for j in range(i, word_len):
                    cur = cur[word[j]]
                    cur[INDEX] = index

    def f(self, prefix: str, suffix: str) -> int:
        target = suffix + "#" + prefix
        cur = self.trie

        for t in target:
            if not t in cur:
                return -1
            cur = cur[t]
        return cur[INDEX]
```

## 새로 알게 된 것

- 다중 Search에 $O(NK)$ 효율성을 가진 Trie를 다시 학습했다.
- Python의 Trie 구현이 이렇게 간단하게 가능함을 배웠다. 그 전에 직접 defaultdict로 구현했었는데 다음부터는 간단하게 사용할 수 있겠다.
- ```Remind "Simple is Best"```
