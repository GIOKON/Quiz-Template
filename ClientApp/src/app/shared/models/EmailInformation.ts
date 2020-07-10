import { User } from './user';

export interface EmailInformation
{
    body: string;
    subject: string;
    sourceEmail: string;
    sourceEmailName: string;

    user: User;
}
