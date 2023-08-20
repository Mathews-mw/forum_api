import { Either, failure, success } from '@/core/either';
import { IAnswerCommentsRepository } from '../repositories/implementations/IAnswerCommentsRepository';
import { ResourceNotfounError } from './errors/resource-not-found-error';
import { NotallowedError } from './errors/not-allowed-error';

interface DeleteQuestionCommentUseCaseRequest {
	authorId: string;
	answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotfounError | NotallowedError, {}>;

export class DeleteQuestionCommentUseCase {
	constructor(private answerCommentRepository: IAnswerCommentsRepository) {}

	async execute({ authorId, answerCommentId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentRepository.findById(answerCommentId);

		if (!answerComment) {
			return failure(new ResourceNotfounError());
		}

		if (answerComment.authorId.toString() !== authorId) {
			return failure(new NotallowedError());
		}

		await this.answerCommentRepository.delete(answerComment);

		return success({});
	}
}
