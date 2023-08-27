import { Either, failure, success } from '@/core/either';
import { IQuestionCommentsRepository } from '../repositories/implementations/IQuestionCommentsRepository';
import { NotallowedError } from '../../../../core/errors/not-allowed-error';
import { ResourceNotfounError } from './errors/resource-not-found-error';

interface DeleteQuestionCommentUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotfounError | NotallowedError, {}>;

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentRepository: IQuestionCommentsRepository) {}

	async execute({ authorId, questionId }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentRepository.findById(questionId);

		if (!questionComment) {
			return failure(new ResourceNotfounError());
		}

		if (questionComment.authorId.toString() !== authorId) {
			return failure(new NotallowedError());
		}

		await this.questionCommentRepository.delete(questionComment);

		return success({});
	}
}
