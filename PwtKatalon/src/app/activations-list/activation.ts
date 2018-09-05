export interface IActivation {
    id:	number;
    ActivationTime:	Date;
    SchedulerID: number;
    SendUserID: number;
    ReceiveUserID: number;
    Comment: string;
    TestSuite: string;
    ReportName: string;
    ConsoleLog: string;
    ErrorLog: string;
    GitLog: string;
    Status: string;
    RunArguments: string;
    EnvironmentId: string;
    Version: string;
    ZippedResults: string;
    JunitResult: string;
    JsonResult: string;
    CounterTotal: number;
    CounterPassed: number;
    CounterFailed: number;
    CounterErrors: number;
    CounterSeconds: number;
}




	