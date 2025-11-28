# vanilla-js만을 사용한 LocalStorage 기반 게시판 제작(학습용)

## 소개

브라우저의 LocalStorage / SessionStorage를 활용해 구현한

로그인, 회원가입, 게시판 CRUD 기능 구현해보기 입니다.

별도의 서버 없이 동작하며 모든 데이터는 클라이언트 브라우저에 저장됩니다.

---

## 주요 기능 요약

### 1. 회원가입 (sign-up)

(JS: signUp.js)

- 아이디 중복 확인
- 비밀번호 검증
- 사용자 정보를 `localStorage.userList`에 저장

### 2. 로그인 (sign-in)

(JS: signIn.js)

- 아이디/비밀번호 검증
- 로그인 성공 시 `sessionStorage.user` 저장
- 로그인 상태면 자동으로 게시판 이동

### 3. 로그아웃 및 헤더 제어

(JS: header.js)

- 로그인 여부에 따라 메뉴 표시 변경
- 로그아웃 시 sessionStorage 삭제
- 개발용 LocalStorage 초기화 기능 제공

---

## 게시판 기능 (CRUD)

### 글 목록 (board-list)

(JS: boardList.js)

- 전체 게시글 목록 표시
- 페이지당 5개 단위 페이지네이션
- 제목 클릭 시 조회수 증가 후 상세페이지 이동
- 샘플 데이터 삽입 기능 제공

### 글 작성 (board-write)

(JS: boardWrite.js)

- 로그인한 사용자만 글 작성 가능
- 이미지 업로드 후 Base64 변환 저장
- 자동 증가 ID 생성 및 저장

### 글 상세보기 (board-detail)

(JS: boardDetail.js)

- 게시글 내용, 이미지 표시
- Base64 이미지 다운로드 제공
- 작성자 본인에게만 수정/삭제 버튼 표시
- 삭제 시 목록 페이지로 이동

### 글 수정 (board-edit)

(JS: boardEdit.js)

- 기존 데이터 불러오기
- 이미지 재업로드 미리보기
- 수정 후 해당 게시글 데이터 업데이트
---

## 데이터 저장 구조

### localStorage

```
userList: [
  { username, nickName, pw, regDate }
]

boardList: [
  { id, title, content, username, today, count, imgData }
]
```

### sessionStorage

```
user: { username, ... }
```

---

## 실행 방법

### 1) 로컬에서 실행

방법 1

HTML 파일을 브라우저에서 직접 실행합니다.

```
index.html
또는
sign-in.html
```

방법 2

Live Server(VSCode 확장) 사용

- 프로젝트 폴더 열기
- index.html → "Open with Live Server" 실행
---

## 2) 바로 실행하기(GitHub Pages / 링크 클릭)

[Link ->](https://Sohee-Dev.github.io/vanilla-js-board/index.html)

---
## 비고

- 이 프로젝트는 순수 HTML + JavaScript만으로 동작합니다.
- 이미지 업로드는 Base64 형식으로 LocalStorage에 저장되기 때문에 저장 공간을 초과할 수 있으며, 5MB 제한을 적용하고 있습니다.
- 용량이 넘어갈 경우 상단의 localStorage 비우기 버튼을 눌러 저장소를 비워주세요
