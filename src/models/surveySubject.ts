export class SurveySubject {

    id: number;
    question_id: number;
    subject_question: string;
    survey_year: number;
    survey_semestar: number;

    constructor(question_id, subject_question){
        this.question_id = question_id;
        this.subject_question = subject_question;
    }
}

