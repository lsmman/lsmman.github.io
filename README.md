# 임승현 포트폴리오 사이트

React + Framer Motion을 CDN으로 불러서 브라우저에서 직접 JSX를 컴파일하는 단일 페이지 정적 사이트입니다. 빌드 단계가 없어서 어떤 정적 호스팅에도 그대로 올릴 수 있습니다.

## 폴더 구조

```
portfolio-site/
├── index.html      # 메인 페이지 (포트폴리오 본문)
├── intro.jsx       # 인트로 시퀀스 (외부 스크립트로 로드됨)
├── .nojekyll       # GitHub Pages가 Jekyll 처리를 건너뛰게 함
└── README.md
```

`index.html`은 head에서 `intro.jsx`를 `<script type="text/babel" src="intro.jsx">`로 먼저 불러오고, 메인 인라인 스크립트에서 `window.IntroSequence`를 받아 사용합니다.

## 로컬에서 확인

`file://`로 직접 열면 CORS 때문에 `intro.jsx`가 로드되지 않을 수 있습니다. 간단한 정적 서버로 띄우세요.

```bash
# 폴더에서
python3 -m http.server 8080
# 또는
npx serve .
```

그 다음 http://localhost:8080 접속.

## GitHub Pages 배포 (선택한 옵션)

### A. 개인 사이트로 배포 — `https://<유저명>.github.io`

1. GitHub에서 새 레포지토리를 만들고 이름을 정확히 **`<당신의-깃허브-유저명>.github.io`** 로 지정합니다 (예: `theolim-automation.github.io`).
2. 터미널에서 이 폴더 안으로 이동:
   ```bash
   cd ~/Downloads/portfolio-site
   git init
   git add .
   git commit -m "initial"
   git branch -M main
   git remote add origin https://github.com/<유저명>/<유저명>.github.io.git
   git push -u origin main
   ```
3. 1~2분 뒤 `https://<유저명>.github.io` 에서 확인 가능합니다. 별도 설정 불필요.

### B. 프로젝트 사이트로 배포 — `https://<유저명>.github.io/<레포명>`

1. 아무 이름으로 레포를 만듭니다 (예: `portfolio`).
2. 위와 동일하게 push 합니다.
3. 레포지토리 페이지에서 **Settings → Pages** 진입.
4. **Build and deployment → Source** 를 `Deploy from a branch` 로 두고, **Branch** 를 `main` / `/ (root)` 로 선택 후 Save.
5. 1~2분 뒤 표시되는 URL(`https://<유저명>.github.io/<레포명>/`)로 접속.

> **참고:** B 옵션은 레포명이 URL에 포함되므로 사이트 내부에서 절대경로(`/intro.jsx` 같은)를 쓰면 깨집니다. 이 사이트는 상대경로(`intro.jsx`)만 사용해서 문제없습니다.

### CLI 한 번에 (gh 사용 시)

```bash
cd ~/Downloads/portfolio-site
gh repo create portfolio --public --source=. --push
gh api -X POST /repos/:owner/portfolio/pages -f source[branch]=main -f source[path]=/
```

## 다른 호스팅 대안

빌드 산출물이 없는 정적 파일이라 어떤 호스팅에든 그대로 올릴 수 있습니다.

- **Vercel** — `vercel` CLI 설치 후 폴더에서 `vercel` 한 줄. 또는 vercel.com 대시보드에서 폴더 드래그앤드롭.
- **Netlify Drop** — https://app.netlify.com/drop 에 폴더를 드래그하면 즉시 배포 (회원가입 없이도 임시 URL 발급).
- **Cloudflare Pages** — GitHub 연동 후 빌드 명령 비워두고 출력 디렉터리만 `.` 로 지정.
- **Surge** — `npm i -g surge && surge .`

## 알아둘 것

- **Babel standalone**: JSX를 브라우저에서 매번 컴파일하므로 첫 로딩이 약간 느립니다. 운영 단계에 가면 Vite 같은 빌드 도구로 사전 컴파일하는 게 좋습니다.
- **`data-plugins`**: `index.html` 안의 메인 babel 스크립트에 `transform-react-jsx-source,om-src-id,om-text-extract` 플러그인이 지정돼 있습니다. `om-*` 두 개는 Claude 아티팩트 환경 전용이라 일반 브라우저에서는 무시되거나 콘솔 경고가 뜰 수 있습니다. 사이트 동작에는 영향 없습니다. 깔끔하게 만들고 싶으면 그 속성을 제거하세요.
- **Intro 스킵**: 인트로는 한 번 본 뒤 `localStorage`에 기록돼 재방문 시 자동 스킵됩니다. 다시 보려면 브라우저 콘솔에서 `localStorage.removeItem('intro-seen-lsh')` 후 새로고침.
