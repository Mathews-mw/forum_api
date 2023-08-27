import { Either, failure, success } from '@/core/either';
import { IQuestionRepository } from '../repositories/implementations/IQuestionRepository';
import { ResourceNotfounError } from './errors/resource-not-found-error';
import { NotallowedError } from '../../../../core/errors/not-allowed-error';

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotfounError | NotallowedError, {}>;

export class DeleteQuestionUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return failure(new ResourceNotfounError());
		}

		if (authorId !== question.authorId.toString()) {
			return failure(new NotallowedError());
		}

		await this.questionRepository.delete(question);

		return success({});
	}
}
