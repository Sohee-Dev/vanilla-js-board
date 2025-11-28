let user = sessionStorage.getItem('user');

document.addEventListener("DOMContentLoaded", () =>{

    const signInBtn = document.querySelector('#signIn');
    const signUpBtn = document.querySelector('#signUp');
    const boardBtn = document.querySelector('#board');
    const logoutBtn = document.querySelector('#logout');
    const boardClear = document.querySelector('#boardClear');

    if(user){
        logoutBtn.style.display = 'inline';
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
    }
    
    if(signInBtn){
        signInBtn.addEventListener('click', () =>{
            if(user){
                alert("이미 로그인 되어져있습니다, 로그아웃 후 이용해주세요");
                window.location.href = "board-list.html";
                return;
            }
            window.location.href = "sign-in.html";
        });
    }

    
    if(signUpBtn){
        signUpBtn.addEventListener('click', () =>{
            window.location.href = "sign-up.html";
        });
    }
    
    if(boardBtn){
        boardBtn.addEventListener('click', () =>{
            window.location.href = "board-list.html";
        });
    }
    
    if(logoutBtn){
        logoutBtn.addEventListener('click', () => {
            if(user){
                sessionStorage.removeItem('user');
                alert("로그아웃 되었습니다");
                window.location.href = "sign-in.html";
            }
            
        });
    }

    if(boardClear){
        boardClear.addEventListener('click',() =>{
            if(confirm("localStorage가 초기화 됩니다\n진행하시겠습니까?")){
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            }
        })
    }
    
    
});


// 로그인 상태가 아니면 지정된 페이지로 리디렉션
function redirectToPageIfNotLoggedIn(page) {
    // 만약 로그인된 사용자가 없으면 지정된 페이지로 이동
    if (user === null) {
        window.location.href = `${page}.html`;
    }
}
