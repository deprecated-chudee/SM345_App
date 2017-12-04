import { Mentoroom } from './mentoroom';

export class MentoCreate {
    picture: FormData;
    file: FormData;
    mentoroom: Mentoroom;

    constructor(p, f, m) {
        this.picture = p;
        this.file = f;
        this.mentoroom = m;
    }
}