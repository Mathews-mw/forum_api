import { Either, failure, success } from '@/core/either';
import { IAnswerRepository } from '../repositories/implementations/IAnswerRepository';
import { ResourceNotfounError } from './errors/resource-not-found-error';
import { NotallowedError } from './errors/not-allowed-error';

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotfounError | NotallowedError, {}>;

export class DeleteAnswerUseCase {
	constructor(private answerRepository: IAnswerRepository) {}

	async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return failure(new ResourceNotfounError());
		}

		if (authorId !== answer.authorId.toString()) {
			return failure(new NotallowedError());
		}

		await this.answerRepository.delete(answer);

		return success({});
	}
}
