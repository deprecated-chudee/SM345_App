export class Upload {
    id: number;
    file_name: string;
    file_type: string;
    file_data: Blob;
    file_kind: number;
    room_id: number;
    state: number;
    timestamp: Date;
}