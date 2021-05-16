---
layout: post
title: PS. Valid Number
category: Algorithm
tag: Python
---

## 문제 정보

- 문제 : 65. Valid Number
- 링크 : [Here](https://leetcode.com/problems/valid-number/) on leetcode

## 문제 설명

- Valid number인지 체크하고 그에 따른 True/False를 return 하는 문제이다.
<!--break-->
- 적절한 숫자의 형태는 다음과 같다
    1. Decimal number나 Integer
    2. 'e'나 'E'를 사용한 숫자 표현 ex) 2e3, -12.2e+5
        - e를 사용한 valid pattern은 (Integer + e + Integer)와 (decimal + e + Integer)이다.
- Decimal number는 valid pattern은 다음과 같다.
    1. (옵션) 첫번째 위치에 +, -와 같은 기호
    2. digit + dot(.)
    3. digit + dot(.) + digit
    4. dot(.) + digit
- Integer는 valid pattern은 다음과 같다.
    1. (옵션) 첫번째 위치에 +, -와 같은 기호
    2. 한 개 이상의 digit

```python
Input
    string = "2" # "-0.1", "-.9", "+53.5e-3"

    sol = Solution()
    output = sol.isNumber(string)

Output
    True/False # whether string is valid number
```

## 제약 사항

- $1 <= s.length <= 20$
- s consists of only English letters (both uppercase and lowercase), digits (0-9), plus '+', minus '-', or dot '.'.

## 풀이 방법

### A. 풀어내기

1. e가 s에 포함되어 있다면
    - 두 개의 vaild pattern에 해당되면 True
    - Decimal + e + Integer
    - Integer + e + Integer

2. e가 s에 포함되어 있지 않다면
    - Decimal이거나 Integer이면 True

### B. big-O 분석하기

- S를 탐색하는 시간이 O(N)으로 가장 길다
- N : String의 길이
- 시간 복잡도 : $O(N)$
- 공간 복잡도 : $O(N)$

----

## 구현 코드 [(link)](https://github.com/lsmman/All-about-Algorithms/blob/master/leetcode/65.py)

```python
class Solution:
    def __isDecimal(self, s: str) -> bool:
        if s[0] in "+-":
            s = s[1:]
        dot_index = s.find(".")
        if dot_index == -1:
            return False

        pre, post = s[:dot_index], s[dot_index + 1 :]
        # .digit pattern
        if dot_index == 0:
            return post.isdigit()
        # digit. pattern
        elif dot_index == len(s) - 1:
            return pre.isdigit()
        # digit.digit pattern
        else:
            return pre.isdigit() and post.isdigit()

    def __isInteger(self, s: str) -> bool:
        if s[0] in "+-":
            s = s[1:]
        return s.isdigit()

    def isNumber(self, s: str) -> bool:
        e_index = s.find("e")
        if e_index == -1:
            e_index = s.find("E")

        # not exist e in s
        if e_index == -1:
            # return whether s is a decimal number or an integer
            return self.__isDecimal(s) or self.__isInteger(s)

        # exist e in s
        else:
            pre = s[:e_index]  # pre-e
            post = s[e_index + 1 :]  # post-e
            # available pattern : Decimal e Interger, Integer e Interger
            return (
                pre
                and post
                and (self.__isDecimal(pre) or self.__isInteger(pre))
                and self.__isInteger(post)
            )
```

## 테스트 코드

```python

import unittest


class TestCases(unittest.TestCase):
    def test_valid(self):
        solution = Solution()
        valid_nums = [
            "2",
            "0089",
            "-0.1",
            "+3.14",
            "4.",
            "-.9",
            "2e10",
            "-90E3",
            "3e+7",
            "+6e-1",
            "53.5e93",
            "-123.456e789",
        ]
        for vn in valid_nums:
            self.assertTrue(solution.isNumber(vn))  # True

    def test_no_valid(self):
        solution = Solution()
        no_valid_nums = ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]
        for nvn in no_valid_nums:
            print(nvn, solution.isNumber(nvn))
            self.assertFalse(solution.isNumber(nvn))  # False

    def test_struggling(self):
        solution = Solution()
        struggle_nums_true = ["+.8"]
        struggle_nums_false = ["e2", "2e", "4e+", "+.", "4.."]
        for sn in struggle_nums_true:
            self.assertTrue(solution.isNumber(sn))
        for sn in struggle_nums_false:
            self.assertFalse(solution.isNumber(sn))


unittest.main()
```

<!-- ## 새로 알게 된 것 -->
