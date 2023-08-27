import { Question } from '../entities/question';
import { DomainEvent } from '@/events/domain-event';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export class QuestBestAnswerChoseEvent implements DomainEvent {
	public ocurredAt: Date;
	public question: Question;
	public bestAnswerId: UniqueEntityId;

	constructor(question: Question, bestAnswerId: UniqueEntityId) {
		this.question = question;
		this.bestAnswerId = bestAnswerId;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityId {
		return this.question.id;
	}
}
