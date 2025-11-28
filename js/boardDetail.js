// 1. 해당 게시글 정보 들고 오기
// 2. DOM API - 데이터 출력
// 3. 사용자 권한 확인 (로그인 유무, 작성자 여부)
// 4. 삭제,수정 버튼 활성화 여부
// 5. 삭제 기능 구현
// 6. 게시글 수정화면 이동 (권환 확인)

document.addEventListener("DOMContentLoaded", () =>{

    const urlParams = new URLSearchParams(window.location.search); // ? 뒤의 쿼리 문자열을 들고와서 key/value 형태로 쉽게 다루기 위한 경우

    const postId = urlParams.get("id"); // url에서 Id가져오기
    const storedBoardList = JSON.parse(localStorage.getItem('boardList'));
    const user = JSON.parse(sessionStorage.getItem('user')); // 현재 로그인 정보
    let currentPost;

    // 게시글 목록(storedBoardList)과 게시글 ID(postId)가 있는지 확인
    if(storedBoardList && postId){
        currentPost = null;

        for(let i = 0; i < storedBoardList.length; i++){
            let post = storedBoardList[i];

            if(post.id === parseInt(postId)){
                currentPost = post;
                break;
            }
        }
        // 게시글을 찾지 못한 경우
        if(!currentPost){
            alert("해당 게시글을 찾을 수 없습니다");

            window.location.href = "board-list.html";
        }
    }

    const titleElement = document.querySelector("#title");
    const usernameElement = document.querySelector("#username");
    const imgBoxElement = document.querySelector("#imgBox");
    const contentElement = document.querySelector("#content");
    const downloadBtn = document.querySelector('.downloadBtn');

    if(currentPost != null){
        titleElement.value = currentPost.title;
        usernameElement.value = currentPost.username;

        if(currentPost != null && currentPost.imgData){
            // img 태그 생성
            const imgElement = document.createElement("img");
            imgElement.src = currentPost.imgData; // Base64값 할당

            // img 스타일 설정
            imgElement.style.width = "100%";
            imgElement.style.height = "auto"; // 자동 높이 설정

            // imgBox 태그에 자식 태그로 추가
            imgBoxElement.appendChild(imgElement);
        }
        else{
            imgBoxElement.innerHTML=`<p class="p_text"> 첨부된 파일이 없습니다 </p>`
            downloadBtn.style.display = "none";
        }
        contentElement.innerHTML = currentPost.content;
    }

    // 3. 사용자 권한 확인 (로그인 유무, 작성자 유무)
    const deleteButton = document.querySelector(".delete-button");
    const editButton = document.querySelector(".edit-button");

    if(user && currentPost.username === user.username){
        deleteButton.style.display = "block";
        editButton.style.display = "block";
    }else{
        deleteButton.style.display = "none";
        editButton.style.display = "none";
    }

    // 삭제기능
    deleteButton.addEventListener("click", () => {
        if(confirm("정말 삭제 하시겠습니까?")){
            const updateBoardList = [];
            // 삭제한 게시글 빼고 다시 리스트 구성해서 저장
            storedBoardList.forEach(board => {
                if(board.id !== parseInt(postId)){
                    updateBoardList.push(board);
                }
            });
            localStorage.setItem("boardList", JSON.stringify(updateBoardList));
            alert("게시글이 삭제 되었습니다");
            window.location.href = "board-list.html"; // 삭제 후 목록으로 이동
        }
    });

    // 6. 게시글 수정화면 이동 (권한 확인)
    // 수정 기능 직접 구현해보기

    editButton.addEventListener("click", function () {
      if (user && currentPost.username === user.username) {
        window.location.href = `board-edit.html?id=${postId}`;
      } else {
        alert("수정 권한이 없습니다.");
      }
    });

    downloadBtn.addEventListener("click", () =>{
        if(currentPost.imgData){
            downloadBase64Image(currentPost.imgData, "img" + currentPost.id);
        }
    });
});

// Base64 문자열 -> Blob(파일 데이터) -> 다운로드
// 1. Base64 -> Blob 변환 함수
function base64ToBlob(base64) {
    const parts = base64.split(",");
    const mime = parts[0].match(/:(.*?);/)[1]; // mime타입만 깔끔하게 뽑아오기 위해 match 정규식 사용
    const bstr = atob(parts[1]); // 텍스트  -> 바이너리 문자열 변환(atob)
    let n = bstr.length;
    const u8arr = new Uint8Array(n); // byte 배열 생성

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n); // 바이너리  -> byte 배열로 넣기
    }

    return new Blob([u8arr], { type: mime });
}

// Blob -> 다운로드 함수
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob); // Blob을 브라우저 주소(URL)로 바꾼 것
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url); // 메모리 해제
}

function mimeToExt(mime) {
    switch(mime) {
        case "image/jpeg": return ".jpg";
        case "image/png": return ".png";
        case "image/gif": return ".gif";
        default: return "";
    }
}

// base64, 파일 이름 넣어서 실행 하는 함수
function downloadBase64Image(base64, filename) {
    const blob = base64ToBlob(base64);
    const ext = mimeToExt(blob.type) // 자동으로 확장자 붙이기 위함
    downloadBlob(blob, filename+ext);
}