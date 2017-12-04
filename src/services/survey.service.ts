// // 게시글 목록 가져오기
// getArticleList(board_id: number): Promise<Article[]> {
//     let url = this.URL + 'article/list/' + board_id;
//     return this.http.get(url)
//         .toPromise()
//         .then(response => response.json() as Article[])
//         .catch(this.handleError);
// }

// // 게시글 정보 가져오기
// getArticle(article_id: number, user_id: number): Promise<Article> {
//     let url = this.URL + 'article/list/' + article_id + '/' + user_id ;
//     return this.http.get(url)
//         .toPromise()
//         .then(response => response.json() as Article)
//         .catch(this.handleError);
// }



//api/:u_id/survey_check - 설문조사 참여 여부 [get] user_id를 받아와 설문조사 참여 여부를 리턴. 0이면 설문조사 안한것, 1이면 한것. 멘토방에서 이미 설문조사에 참여한 학생에게 설문조사가 뜨지않도록 하기 위해 사용
//api/article/list/:bid - 게시판 목록 [get] board_id를 받아와 리스트 리턴
//api/article/list/:a_id/:u_id - 게시글 보기 [get] article_id를 받아와 user_id를 받아와 article_writer와 비교후 조회수 증가
