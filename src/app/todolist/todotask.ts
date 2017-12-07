export class TodoTask {
    public $key: string;
    public name: string;
    public description: string;
    public startdate: string;
    public enddate: string;
    public isDone: boolean;

    //constructor(name: string, ds: string, starton: string, finishon: string) {
    //    this.name = name;
    //    this.description = ds;
    //    this.startdate = starton;
    //    this.enddate = finishon;
    //}

    constructor(name: string, ds: string, starton: string, finishon: string, isdone: boolean = false) {
        this.name = name;
        this.description = ds;
        this.startdate = starton;
        this.enddate = finishon;
        this.isDone = isdone;
    }
}
