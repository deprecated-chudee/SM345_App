export class User{
    user_id: string;
    user_password: string;
    user_auth: number;
    user_name: string;
    login_record: number;

    constructor(user_id: string, user_password: string, user_auth: number, user_name: string){
        this.user_id = user_id;
        this.user_password = user_password;
        this.user_auth = user_auth;
        this.user_name = user_name;
    }
}