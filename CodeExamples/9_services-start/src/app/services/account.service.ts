import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountService {

    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        }
        // ,
        // {
        //   name: 'Testaccount',
        //   status: 'inactive'
        // },
        // {
        //   name: 'Hidden Account',
        //   status: 'unknown'
        // }
    ];

    constructor(private loggingService: LoggingService) {}

    addAccount(account: {name: string, status: string}) {
        this.accounts.push(account);
        this.loggingService.serverStatusChange(account.status);
    }  

    changeStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.serverStatusChange(status);
    }
}