export class JobDetails{
    constructor(
        public jobId: number,
        public title: string,
        public jobLink: string,
        public description: string,
        public visitedDate: Date,
        public score?: number
    ){}
}