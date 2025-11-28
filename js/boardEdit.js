document.addEventListener("DOMContentLoaded", () =>{
    const urlParams = new URLSearchParams(window.location.search); // ? 뒤의 쿼리 문자열을 들고와서 key/value 형태로 쉽게 다루기 위한 경우

    const postId = parseInt(urlParams.get("id")); // url에서 Id가져오기
    const storedBoardList = JSON.parse(localStorage.getItem('boardList'));
    const user = JSON.parse(sessionStorage.getItem('user')); // 현재 로그인 정보

    const title = document.querySelector('.title'); // 제목 입력 필드
    const username = document.querySelector('.username'); // 사용자명 입력 필드
    const fileInput = document.querySelector('.file'); // 파일 입력 필드
    const imgViewBox = document.querySelector('.img-box'); // 이미지 미리보기 영역
    const content = document.querySelector('.content'); // 내용 입력 필드
    const button = document.querySelector('.btn'); // 글쓰기 버튼 요소

    let imageData = null; // 업로드된 이미지 데이터를 저장할 변수
    const day = new Date(); // 현재 날짜 객체 생성

    const editBoard = storedBoardList.find(post => post.id === postId); // 수정 할 게시물의 기존데이터
    const index = storedBoardList.findIndex(post => post.id === postId); // 수정 할 게시물의 인덱스

    console.log(editBoard);

    title.value = editBoard.title;
    username.value = user.username;
    content.value = editBoard.content;

    if(editBoard.imgData){ // 기존에 첨부 이미지가 있으면 출력
        imgViewBox.innerHTML = `<img src="${editBoard.imgData}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
    }

    fileInput.addEventListener('change', (event) =>{
        const file = event.target.files[0];

        // 파일 크기 유효성 검사 < 5MB
        // 5MB = 5*1024*1024 바이트
        if(file.size >= 5242880) {
            alert("첨부 파일은 5MB 이하만 가능 합니다");
            event.target.value = ''; // 파일 입력 필드 초기화
            return;
        }

        // 파일 타입 유효성 검사
        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if(!validFileTypes.includes(file.type)){
            alert("유효한 파일 타입이 아닙니다 (jpeg, png, gif만 허용)");
            return;
        }


        // 파일 미리보기 기능
        const reader = new FileReader();
        reader.readAsDataURL(file); // 파일을 Base64 형식으로 읽기
        reader.onload = (e) =>{ // 파일 읽은 후 실행되는 핸들러(비동기로 작동함)
            imgViewBox.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
            imageData = reader.result;
        }
       
    });

    button.addEventListener('click', () =>{
        let boardList = JSON.parse(localStorage.getItem('boardList')) || [];

        const updateBoard = {
            id: editBoard.id,
            title: title.value,
            content: content.value,
            username: username.value,
            today: `${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`,
            count: editBoard.count ? editBoard.count : 0,
            imgData: imageData ? imageData : editBoard.imageData // 이미지 미리보기 데이터
        };
        boardList[index] = updateBoard;
        localStorage.setItem('boardList', JSON.stringify(boardList));

        alert("수정이 완료되었습니다");
        location.href = 'board-list.html';
    })

});