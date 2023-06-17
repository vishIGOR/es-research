export abstract class Event {
	id: string;
	date: Date;

	toObject(): object {
		return { id: this.id, date: this.date };
	}
}