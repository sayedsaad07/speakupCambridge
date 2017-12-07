export class TodoTask {
    public $key: string;
    public name: string;
    public description: string;
    public startdate: string;
    public enddate: string;
    public isDone: boolean;
    public userid: string;
    //constructor(name: string, ds: string, starton: string, finishon: string) {
    //    this.name = name;
    //    this.description = ds;
    //    this.startdate = starton;
    //    this.enddate = finishon;
    //}
    sayedsaaduserkey: string = "C0yHY8o2tEZbVMKCtDTIsbZqKwJ3";
    constructor(name: string, ds: string, starton: string, finishon: string, isdone: boolean = false,
        user: string = null) {
        this.name = name;
        this.description = ds;
        this.startdate = starton;
        this.enddate = finishon;
        this.isDone = isdone;
        user === null
            ? this.userid = this.sayedsaaduserkey
            : this.userid = user;
    }
}
