export class eventAudience {
    public $key: string;
    public eventkey: string;
    public name: string;
    public email: string;
    public subject: string;
    public topic: string;
    public speechDuration: string;
    public showup: boolean;
    public userid: string;
    //constructor(name: string, ds: string, starton: string, finishon: string) {
    //    this.name = name;
    //    this.description = ds;
    //    this.startdate = starton;
    //    this.enddate = finishon;
    //}
    sayedsaaduserkey: string = "C0yHY8o2tEZbVMKCtDTIsbZqKwJ3";
    constructor(eventkey: string, name: string,
                    email: string,
                    subject: string,
                    topic: string, speechDuration: string,
                    showup: boolean = false,
                    user: string = null) {
        this.eventkey = eventkey;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.topic = topic;
        this.speechDuration = speechDuration;
        this.showup = showup;
        user === null
            ? this.userid = this.sayedsaaduserkey
            : this.userid = user;
    }
}
