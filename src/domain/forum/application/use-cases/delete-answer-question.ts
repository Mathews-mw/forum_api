import { Either, success } from '@/core/either';
import { IAnswerCommentsRepository } from '../repositories/implementations/IAnswerCommentsRepository';
import { ResourceNotfounError } from './errors/resource-not-found-error';
import { NotallowedError } from './errors/not-allowed-error';

interface DeleteAnswerCommentUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotfounError | NotallowedError, {}>;

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentRepository: IAnswerCommentsRepository) {}

	async execute({ authorId, answerId }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentRepository.findById(answerId);

		if (!answerComment) {
			throw new Error('Answer comment not found.');
		}

		if (answerComment.authorId.toString() !== authorId) {
			throw new Error('Not allowed.');
		}

		await this.answerCommentRepository.delete(answerComment);

		return success({});
	}
}
