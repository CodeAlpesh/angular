export class LoggingService {

    serverStatusChange(status: string) {
        console.log('A server status changed, new status: ' + status);
    }

}