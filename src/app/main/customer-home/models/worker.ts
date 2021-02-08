export class WorkerUser { 
    id: number = 0;
    id_user_type: number = 0;
    id_company: number = 0;
    name: string = '';
    email: string = '';
    password: string = '';
    dt_register: Date = new Date();
    dt_birth: Date = new Date();
    avatar: any;
}