export class AccountService {

    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

    addAccount(account: {name: string, status: string}) {
        this.accounts.push(account);
    }  

    changeStatus(id: number, status: string) {
        this.accounts[id].status = status;
    }
}