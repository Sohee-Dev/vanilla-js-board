// 샘플 데이터
const sampleBoardList = [
    {
        id: 1,
        title: "첫 번째 게시글",
        content: "첫 번째 게시글의 내용입니다.",
        username: "홍길동",
        today: "2024.06.25",
        count: 5
    },
    {
        id: 2,
        title: "두 번째 게시글",
        content: "두 번째 게시글의 내용입니다.",
        username: "이몽룡",
        today: "2024.06.26",
        count: 8
    },
    {
        id: 3,
        title: "세 번째 게시글",
        content: "세 번째 게시글의 내용입니다.",
        username: "성춘향",
        today: "2024.06.27",
        count: 10
    },
    {
        id: 4,
        title: "네 번째 게시글",
        content: "네 번째 게시글의 내용입니다.",
        username: "변학도",
        today: "2024.06.28",
        count: 3
    },
    {
        id: 5,
        title: "다섯 번째 게시글",
        content: "다섯 번째 게시글의 내용입니다.",
        username: "심청",
        today: "2024.06.29",
        count: 7
    },
    {
        id: 6,
        title: "여섯 번째 게시글",
        content: "여섯 번째 게시글의 내용입니다.",
        username: "심청",
        today: "2024.06.29",
        count: 7
    },
    {
        id: 7,
        title: "일곱 번째 게시글",
        content: "일곱 번째 게시글의 내용입니다.",
        username: "치이카와",
        today: "2024.06.30",
        count: 4
    },
    {
        id: 8,
        title: "여덟 번째 게시글",
        content: "여덟 번째 게시글의 내용입니다.",
        username: "하치와레",
        today: "2024.07.01",
        count: 3
    }
];

  // 로컬 스토리지에 샘플 데이터 저장
  // localStorage.setItem("boardList", JSON.stringify(sampleBoardList));

  
  const writeButton = document.querySelector(".btn");

  writeButton.addEventListener("click", () =>{
    location.href  = "board-write.html"; // 글쓰기 페이지로 이동
  })

  document.addEventListener("DOMContentLoaded", () => {
    const boardContainer = document.querySelector(".board-content-box");
    const paginationContainer = document.querySelector(".num-box");

    const storedBoardList = JSON.parse(localStorage.getItem("boardList")) || [];

    const rightBtn = document.querySelector(".right");
    const leftBtn = document.querySelector(".left");

    if(storedBoardList){
        storedBoardList.sort((a, b) => b.id - a.id);
    }

    let currentPage = 0;
    const limit = 5; // 한페이지당 최대 게시글 수
    const totalPages = Math.ceil(storedBoardList.length / limit);

    loadPosts(currentPage);

    function loadPosts(page){
        currentPage = page; // 현재 페이지 전역변수 최신화

        const offset = page * limit; // 시작인덱스
        const end = offset + limit; // 가져올 개수

        let postElements = ""; // 게시글 html 요소를 저장하는 변수

        if(storedBoardList != null  && storedBoardList.length > 0){
            for(let i = offset; i < end && i < storedBoardList.length; i++){
                postElements += `
                    <div class="board">
                        <div class="board-1">${i + 1}</div>
                        <div class="board-2">
                            <a href="board-detail.html?id=${storedBoardList[i].id}" 
                                class="location_a" 
                                data-id="${storedBoardList[i].id}">
                                ${storedBoardList[i].title}
                            </a>
                        </div>
                        <div class="board-3">${storedBoardList[i].username}</div>
                        <div class="board-4">${storedBoardList[i].today}</div>
                        <div class="board-5">${storedBoardList[i].count}</div>
                    </div>
                `
            }
            boardContainer.innerHTML = postElements;

            createPageination(storedBoardList, page);

            
            rightBtn.classList.toggle("hide", currentPage === totalPages - 1);
            leftBtn.classList.toggle("hide", currentPage === 0);
            // display = none 방식은 레이아웃까지 없어져서 버튼 배치가 이상해짐  
            // 대신 visibility를 써서 레이아웃을 남겨둠(CSS 클래스)
            // DOM이 로드 된 이후에 실행되어서 딜레이가 있음 => loadPosts함수를 최상단으로 올려서 해결가능
        }else{
            boardContainer.innerHTML = `
                <div class="no-list" style="text-align:center; margin-top:20px;">
                    조회된 게시글이 없습니다<br/>
                    <button type="button" class="insertBtn">
                        보드 샘플데이터 넣기
                    </button>
                </div>
                
            `;
        }
        const insertBtn = document.querySelector(".insertBtn");

        if(insertBtn){ // 샘플데이터 버튼이 있으면 실행
            insertBtn.addEventListener("click", () =>{
                if(!localStorage.getItem("boardList")){
                    localStorage.setItem("boardList", JSON.stringify(sampleBoardList));
                    location.reload();
                }
                else{
                    alert("이미 데이터가 존재합니다");
                }
            });

        }

        const location_a = document.querySelectorAll(".location_a");

        location_a.forEach(link =>{
            link.addEventListener("click", function(e){
                e.preventDefault();

                const postId = parseInt(this.dataset.id);;

                const index = storedBoardList.findIndex(item => item.id === postId);

                storedBoardList[index].count += 1;

                localStorage.setItem("boardList", JSON.stringify(storedBoardList));

                location.href = this.href;
            });
        });
        

    }



    function createPageination(postList, currentPage){
        const totalPosts = postList.length; // 전체 게시글 수

        let paginationHTML = ""; // 페이지 번호 저장

        for (let i = 0; i < totalPages; i++) {
            paginationHTML += `
                    <span class="num" data-page="${i}">${i + 1}</span>
            `;
        }
        paginationContainer.innerHTML = paginationHTML;

        const pageNumbers = document.querySelectorAll(".num");

        pageNumbers.forEach(num => num.classList.remove("active"));
        pageNumbers[currentPage].classList.add("active");

        pageNumbers.forEach((pageNumber) => {
            pageNumber.addEventListener("click", (event) =>{
                const page = parseInt(event.target.dataset.page); // 클릭한 번호 담음
                currentPage = page;
                loadPosts(page); // 해당 페이지 로드
            })
        })

    }

    rightBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            loadPosts(currentPage);
        } else {
            alert("마지막 페이지 입니다");
        }
    });

    leftBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            loadPosts(currentPage);
        } else {
            alert("첫 번째 페이지 입니다");
        }
    });
  });

  