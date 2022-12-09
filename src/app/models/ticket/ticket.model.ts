export class Ticket {
    constructor(
        public ticketID: number,
        public assigneeID: number,
        public status: string,
        public subject: string,
        public description: string,
        public tracker: string,
        public requesterID: number,
        public createdAt: Date
    ) { }
}
