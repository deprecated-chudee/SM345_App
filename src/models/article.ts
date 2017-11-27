export class Article {
    id: number;
    board_id: number;
    article_title: string;
    article_content: string;
    article_writer: number;
    article_hit: number;
    timestamp: number;
    user_name: string;
    answer_complete: number;

    constructor(board_id, article_title, article_content, article_writer){
        this.board_id = board_id
        this.article_title = article_title;
        this.article_content = article_content;
        this.article_writer = article_writer;
    }
}