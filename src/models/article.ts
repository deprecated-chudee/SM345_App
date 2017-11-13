export class Article{
    id: number;
    board_id: number;
    article_title: string;
    article_content: string;
    article_writer: number;
    article_hit: number;
    timestamp: number;
    user_name: string;

    constructor(id, board_id, article_title, article_content, article_writer, article_hit, timestamp, user_name){
        this.id=id;
        this.article_title=article_title;
        this.article_content=article_content;
        this.article_writer=article_writer;
        this.article_hit=article_hit;
        this.timestamp=timestamp;
        this.user_name=user_name;
    }
}