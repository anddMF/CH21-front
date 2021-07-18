export class ImageFile {
    id: number = 0;
    id_arc_profile?: number = 0;
    id_room_type?: number = 0;
    id_company?: number = 0;
    base_image: string = '';
    color_1?: string = '';
    color_2?: string = '';
    dt_register?: Date = new Date();
    used?: boolean = false;

    profile_name?: string = '';
    room_name?: string = '';
}