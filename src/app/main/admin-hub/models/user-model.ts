export class User {
    data = new UserData();
    token = '';
}

export class UserData {
    id?: number = 0;
    idCompany: number = 0;
    idUserType?: number = 0;
    name = '';
    email = '';
    password = '';
    dtBirth: Date = new Date();
    dtRegister?: Date = new Date();
    avatar? = '';
}