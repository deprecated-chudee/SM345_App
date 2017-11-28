import { Binary } from "@angular/compiler";

export class Upload {
    id: number;
    file_name: string;
    file_type: string;
    file_content: any;
    file_kind: number;
    room_id: number;
    state: number;
    timestamp: Date;

    constructor(file_name, file_type, file_content, file_kind, room_id) {
        this.file_name = file_name,
        this.file_type = file_type,
        this.file_content = file_content,
        this.file_kind = file_kind,
        this.room_id = room_id
    }
}