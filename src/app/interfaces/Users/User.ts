export class UserObject {
    userId: number;
    providerId: string;
    email: string;
    password: string;
    userName: string;
    firstName: string;
    lastName?: string;
    avatar?: string;
    lastSession?: string;
}

export class User {
    userId: number;
    providerId: string;
    email: string;
    password: string;
    userName: string;
    firstName: string;
    lastName?: string;
    avatar?: string;
    lastSession?: string;

    public static New(userObject: UserObject|User): User {
        return new this(userObject);
    }

    constructor(userObject: UserObject|User) {
        this.userId = userObject.userId;
        this.providerId = userObject.providerId;
        this.email = userObject.email;
        this.password = userObject.password;
        this.userName = userObject.userName;
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName??null;
        this.avatar = userObject.avatar??null;
        this.lastSession = userObject.lastSession??null;
    }

    public getAvatar(): string {
        let avatar = (this.avatar) ? this.avatar : '';
        if (avatar === '') avatar = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg';
        return avatar;
    }

    public getFullName(): string {
        let fullName = this.firstName.trimRight();
        if (this.lastName) fullName += ' ' + this.lastName.trimLeft();
        return fullName;
    }

    public getLastSession(fallBack?: string): string {
        let lastSession = (this.lastSession) ? this.lastSession.trim() : ((fallBack) ? fallBack : '');
        return lastSession;
    }

}