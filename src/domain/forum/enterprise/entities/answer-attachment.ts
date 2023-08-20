import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IAnswerAttachmentProps {
	answerId: UniqueEntityId;
	attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<IAnswerAttachmentProps> {
	get answerId() {
		return this.props.answerId;
	}

	get attachmentId() {
		return this.props.attachmentId;
	}

	static create(props: IAnswerAttachmentProps, id?: UniqueEntityId) {
		const answerAttachment = new AnswerAttachment(props, id);

		return answerAttachment;
	}
}
