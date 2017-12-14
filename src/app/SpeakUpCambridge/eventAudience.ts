export class eventAudience {
    public $key: string;
    public $eventkey: string;
    public name: string;
    public subject: string;
    public topic: string;
    public speechDuration: string;
    public userid: string;
    //constructor(name: string, ds: string, starton: string, finishon: string) {
    //    this.name = name;
    //    this.description = ds;
    //    this.startdate = starton;
    //    this.enddate = finishon;
    //}
    sayedsaaduserkey: string = "C0yHY8o2tEZbVMKCtDTIsbZqKwJ3";
    constructor(eventkey: string, name: string, subject: string,
                    topic: string, speechDuration: string,
                    user: string = null) {
        this.$eventkey = eventkey;
        this.name = name;
        this.subject = subject;
        this.topic = topic;
        this.speechDuration = speechDuration;
        user === null
            ? this.userid = this.sayedsaaduserkey
            : this.userid = user;
    }
}
