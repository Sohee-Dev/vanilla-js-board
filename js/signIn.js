// 사용자 로그인 처리 
// 회원가입이된 사용자 확인 
// 사용자 입력값 유효성 검사 
// 로컬 스토리지에 로그인 상태 처리 

const signInBtn = document.getElementById('signInBtn');
const loginForm = document.getElementById('loginForm');

const idInput = loginForm.elements.userId;
const pwInput = loginForm.elements.password;

const userList = JSON.parse(localStorage.getItem('userList')); // localStorage에서 userList받아오기

document.addEventListener('DOMContentLoaded', () =>{
    // 세션에 로그인 된 유저가 있으면 boardList로 바로 이동
    const loggedInUser =  sessionStorage.getItem('user');

    if(loggedInUser){
        window.location.href="board-list.html";
    }
});

signInBtn.addEventListener("click" ,() => {
    const id = idInput.value;
    const pw = pwInput.value;

    if(userList === null || userList.length === 0){
        alert("등록된 사용자가 없습니다");
        return;
    }

    let isExist = false;
    userList.forEach(user => {
        console.log(user);
        if(user.username === id && user.pw === pw){
            isExist = true;
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    });

    if(!isExist){
        alert("아이디 및 비밀번호를 확인하세요");
        idInput.focus();
    }else{
        alert("로그인 완료!");
        window.location.href = "board-list.html";
        return;
    }

})