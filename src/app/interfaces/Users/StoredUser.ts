import { User } from './User';
export interface StoredUser {
    id: number;
    preselected: boolean;
    data: User;
}