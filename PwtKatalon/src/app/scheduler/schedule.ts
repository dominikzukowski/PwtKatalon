export interface ISchedule {
    id: number,
    DateFrom: Date,
    DateTo: Date,
    SendUserId: number,
    Login: string,
    ReceiveUserId: number,
    Repeats: number,
    ActivationHour: number,
    Comment: string,
    AlternativeTestSuite: string
}