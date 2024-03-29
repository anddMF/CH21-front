export class Report {
    id: number = 0;
    id_customer: number = 0;
    id_user_admin: number = 0;
    id_user_worker: number = 0;
    id_company: number = 0;
    dt_register: Date = new Date();
    deal: boolean = false;
    r_read: boolean = false;
    title: string = '';
    r_description: string = '';
    r_key: string = '';
    r1_pic1: string = '';
    r1_pic2: string = '';
    r2_pic1: string = '';
    r2_pic2: number = 0;
    r3_pic1: number = 0;
    r3_pic2: number = 0;
    r4_pic1: number = 0;
    r4_pic2: number = 0;
    r5_pic1: number = 0;
    r5_pic2: number = 0;
    r6_pic1: number = 0;
    r6_pic2: number = 0;
    r7_pic1: number = 0;
    r7_pic2: number = 0;
    r8_pic1: number = 0;
    r8_pic2: number = 0;

    // User data
    name: string = '';
    dt_birth: Date = new Date();
    children: number = 0;
    kid: boolean = false;
    email: string = '';
}