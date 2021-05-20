---
layout: post
title: 추천 시스템의 중요한 알고리즘들
category: recommender_system
tag: algorithms
---

## 추천 시스템은?
서비스 기업에서 시스템에 적용되는 추천은 타겟층이 선호할만한 결과를 제안하는 예측 기술이다. 추천 시스템은 이러한 추천을 데이터를 분석하여 컴퓨터 상에 구현한 것이다.

## 추천 시스템이 가져야할 핵심 가치
- 관련성 : 사용자에게 적합한 아이템을 추천
- 참신성 : 사용자가 전에 본 적 없던 새로운 아이템을 추천
- 우연성 : 사용자에게 다소 의외이거나 놀라움, 호기심을 불러 일으킬 수 있는 아이템을 추천 

## 추천 시스템의 대표적인 모델
- Page Rank
- Content based Recommenders
    - Clustering (KNN)
    - Cosine Similarity
    - Correlations
- Collaborative filtering
    - User-based
    - item-based
- Matrix Factorization
- Multi-armed bandit
- Restricted Boltzmann Machine for CF

#### Page Rank
- 페이지랭크는 페이지의 신뢰도를 점수화한 알고리즘이라고 볼 수 있다. N번 이동 후 해당 사이트에 방문할 확률이 N이 늘어남에 따라 수렴한다는 원리에서 출발한다.
- ![page rank 식](https://camo.githubusercontent.com/61169c167e30681150456ceead11866010f7d9b3ce42533e876cfbc8411b17d5/68747470733a2f2f692e696d6775722e636f6d2f37515a505139632e706e67)
- 중심원리 : https://www.youtube.com/watch?v=PGeBhnHxg0E
- code : https://github.com/rileynwong/simple-pagerank

```python
def pagerank(graph):
    """
    Graph object as input
    Returns a dictionary where the keys are the node names and the values are
    the calculated pagerank score for that given node.
    """

    # Initialize values for all nodes s.t. that add up to one
    n = len(graph.nodes)
    init_val = 1.0/n
    ranks = dict(zip(graph.get_nodes(), [init_val] * n))

    new_ranks = ranks

    # Calculate new rank for each node
    for node, prev_rank in ranks.items():
        rank_sum = 0.0

        # Iterate through incoming nodes
        for incoming_node in node.inbound:
            numerator = ranks[incoming_node]
            denominator = len(incoming_node.outbound)
            transfer_amount = numerator / denominator

            # Transfer rank score
            new_ranks[incoming_node] = new_ranks[incoming_node] - transfer_amount
            rank_sum = rank_sum + transfer_amount

        new_ranks[node] = ranks[node] + rank_sum

    # Set ranks to the new ranks calculated in this iteration
    ranks = new_ranks

    return ranks
```

#### Contents based filtering
- 콘텐츠 기반 필터링 방식은 사용자가 특정 아이템을 선호하는 경우, 그 아이템과 유사한 콘텐츠를 가진 다른 아이템을 추천해주는 방식이다.
- 따라서 아이템을 임베딩해서 아이템 간 유사도, 거리를 측정하고 가까운 것을 고르는 알고리즘을 사용한다.

- 설명&코드 : https://lsjsj92.tistory.com/565

### Collaborative filtering
- 사용자가 아이템에 매긴 평점, 상품 구매 이력 등의 사용자 행동 양식을 기반으로 추천해주는 방식이다.

- User-based
- item-based
- Matrix Factorization
    - latent factor collaborative filtering의 방법으로, 잠재요인을 계산에 반영하기 위해 대규모 다차원 행렬을 SVD와 같은 차원 감소 기법으로 분해한다.
    - https://lsjsj92.tistory.com/564?category=853217 
- 설명 & 코드
    - https://lsjsj92.tistory.com/568
    - https://lsjsj92.tistory.com/569

#### Multi-armed bandit
- https://github.com/bgalbraith/bandits
- https://sumniya.tistory.com/9
- https://brunch.co.kr/@chris-song/62
- https://sumniya.tistory.com/9

## 참고
- https://github.com/lsjsj92/recommender_system_with_Python
- https://github.com/lazyprogrammer/machine_learning_examples/blob/master/recommenders