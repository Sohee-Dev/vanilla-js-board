const signupForm = document.getElementById('signupForm');

const inputs = document.querySelectorAll(".inputs");
const checkIdBtn = document.getElementById("checkIdBtn");
const signUpBtn = document.getElementById("signUpBtn");

const toDay = new Date(); // 현재 날짜 시간 저장

const idInput = signupForm.elements.userId;
const pwInput = signupForm.elements.password;

// 유틸리티 함수 정의
// 로컬 스토리지에서 사용자 정보를 가져옴

function getUserInfo(){
    let userListString = localStorage.getItem("userList");
    if(userListString === null){
        return []; // 저장된 정보가 없으면 빈 배열 반환
    } else{
        return JSON.parse(userListString); // JSON 문자열을 JavaScript 객체로 변환하여 반환
    }
}

// 로컬 스토리지에서 가져온 사용자 정보를 변수에 저장

const userInfo = getUserInfo();

// 핵심 로직 함수 저의
// 아이디 중복 확인
checkIdBtn.addEventListener("click", () => {
    const id = idInput.value;

    const isDuplicate = userInfo.some(user => user.username === id); // 아이디 중복 찾기

    if(isDuplicate){
        alert("이미 존재하는 아이디 입니다");
        idInput.focus();
    }else{
        alert("사용 가능한 아이디 입니다");
        idInput.readOnly = true;
        idInput.style.backgroundColor = "darkGray";
    }
})

signUpBtn.addEventListener("click", () =>{
    const id = idInput.value;
    const pw = pwInput.value;
    const nickName = signupForm.elements.nickName.value;
    const confirmPassword = signupForm.elements.confirmPassword.value;
    
    if(!idInput.readOnly){
        alert("아이디 중복 확인이 필요합니다");
        idInput.focus();
        return;
    }

    if(pw !== confirmPassword){
        alert("비밀번호가 일치하지 않습니다");
        pwInput.focus();
        return;
    }

    const newUser = {
        username: id,
        nickName: nickName,
        pw: pw,
        regDate: toDay.getFullYear() + "." + ( toDay.getMonth() + 1 ) + "." + toDay.getDate() 
    };

    userInfo.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userInfo));
    alert("회원가입이 완료되었습니다");
    window.location.href="sign-in.html";
})