import { Either, failure, success } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { NotallowedError } from '../../../../core/errors/not-allowed-error';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { ResourceNotfounError } from './errors/resource-not-found-error';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { IAnswerRepository } from '../repositories/implementations/IAnswerRepository';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachments-list';
import { IAnswerAttchmentsRepository } from '../repositories/implementations/IAnswerAttachmentsRepository';

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
	attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotfounError | NotallowedError,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(private answerRepository: IAnswerRepository, private answerAttachmentsRepository: IAnswerAttchmentsRepository) {}

	async execute({ authorId, answerId, content, attachmentsIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return failure(new ResourceNotfounError());
		}

		if (authorId !== answer.authorId.toString()) {
			return failure(new NotallowedError());
		}

		const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

		const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments);

		const answerAttachments = attachmentsIds.map((attachmentsId) => {
			return AnswerAttachment.create({
				attachmentId: new UniqueEntityId(attachmentsId),
				answerId: answer.id,
			});
		});

		answerAttachmentList.update(answerAttachments);

		answer.content = content;
		answer.attachments = answerAttachmentList;

		await this.answerRepository.save(answer);

		return success({
			answer,
		});
	}
}
