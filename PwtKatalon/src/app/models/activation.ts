export interface IActivation {
    id:	number;
    activationTime:	Date;
    sendUserLogin: string;
    sendUserOrganization: string;
    comment: string;
    testSuite: string;
    reportName: string;
    consoleLog: string;
    errorLog: string;
    gitLog: string;
    status: string;
    runArguments: string;
    environmentId: string;
    version: string;
    zippedResults: string;
    junitResult: string;
    jsonResult: string;
    counterTotal: number;
    counterPassed: number;
    counterFailed: number;
    counterErrors: number;
    counterSeconds: number;
    isZippedResults: boolean;
    organization: string;
}
