document.addEventListener("DOMContentLoaded", function () {
    // 로그인 여부 확인(이동할 페이지 이름)
    redirectToPageIfNotLoggedIn('sign-in');

    // 사용할 요소 접근 및 로컬스토리지 사용
    const title = document.querySelector('.title'); // 제목 입력 필드
    const username = document.querySelector('.username'); // 사용자명 입력 필드
    const fileInput = document.querySelector('.file'); // 파일 입력 필드
    const imgViewBox = document.querySelector('.img-box'); // 이미지 미리보기 영역
    const content = document.querySelector('.content'); // 내용 입력 필드
    const button = document.querySelector('.btn'); // 글쓰기 버튼 요소

    let imageData = null; // 업로드된 이미지 데이터를 저장할 변수
    const day = new Date(); // 현재 날짜 객체 생성

    // 세션 스토리지에서 사용자 정보 가져오기
    const getUser = JSON.parse(sessionStorage.getItem('user'));
    username.value = getUser.username; // 로그인한 사용자의 이름을 필드에 표시

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

        const newId = boardList.length > 0 ? Math.max(...boardList.map(item => item.id)) + 1 : 1;
        // <...arr> 문법: 배열을 펼쳐서 각각의 값으로 변환
        // MAX에 배열이 아닌 각각의 숫자 하나씩 넣어줘야 하기 때문에 ...(스프레드) 연산자로 하나씩 넣어줌
        // 스프레드(...) 연산자는 거의 JS고유 문법이다(Python, PHP에도 비슷하게 존재)
        // 정렬에 상관없이 MAX값에서 +1한 값을 새 ID로 생성

        const newBoard = {
            id: newId,
            title: title.value,
            content: content.value,
            username: username.value,
            today: `${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`,
            count: 0,
            imgData: imageData // 이미지 미리보기 데이터
        };

        boardList.push(newBoard);
        localStorage.setItem('boardList', JSON.stringify(boardList));

        alert("게시글 작성 완료!\n목록으로 이동합니다");
        location.href = 'board-list.html';
    })

});


