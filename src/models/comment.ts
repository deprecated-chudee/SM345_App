export class Comment {
    article_id: number;
    comment_writer: number;
    comment_content: string;
    timestamp: Date;
    
    constructor(article_id, comment_writer, comment_content) {
        this.article_id = article_id,
        this.comment_writer = comment_writer;
        this.comment_content = comment_content;
    }
}
