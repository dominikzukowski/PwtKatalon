export interface IUser {
    id: number;
    environmentId: string;
    organizationId: string;
    login: string;
    password: string;
    labels: string;
    setupDate: Date;
    agencySend: string;
    agencyReceive: string;
    schedullerReady: number;
}