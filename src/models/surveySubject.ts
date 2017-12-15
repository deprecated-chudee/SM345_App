export class SurveySubject {
    id: number;
    question_id: number;
    subject_question: string;
    survey_year: number;
    survey_semestar: number;

    constructor(subject_question){
        this.subject_question = subject_question;
    }
}

