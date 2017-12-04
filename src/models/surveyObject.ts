export class SurveyObject {
    id: number;
    question_id: number;
    object_question: string;
    object_answer1: number;
    object_answer2: number;
    object_answer3: number;
    object_answer4: number;
    object_answer5: number;
    survey_year: number;
    survey_semestar: number;

    constructor(question_id, object_question){
        this.question_id = question_id;
        this.object_question = object_question;
    }
}

