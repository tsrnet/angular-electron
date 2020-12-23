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
        return new this().map(userObject);
    }

    public static NewEmpty(): User {
        return new this();
    }

    private constructor() {
    }
    
    private map(userObject: UserObject|User) {
        this.userId = userObject.userId;
        this.providerId = userObject.providerId;
        this.email = userObject.email.trim();
        this.password = userObject.password.trim();
        this.userName = userObject.userName.trim();
        this.firstName = userObject.firstName.trim();
        this.lastName = userObject.lastName?.trim()??null;
        this.avatar = userObject.avatar?.trim()??null;
        this.lastSession = userObject.lastSession?.trim()??null;
        return this;
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