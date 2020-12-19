import { User } from './User';
export interface StoredUser {
    data: User;
    prefered: boolean;
    isLogged: boolean;
}