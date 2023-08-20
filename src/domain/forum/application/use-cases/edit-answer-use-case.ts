import { Either, failure, success } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { IAnswerRepository } from '../repositories/implementations/IAnswerRepository';
import { ResourceNotfounError } from './errors/resource-not-found-error';
import { NotallowedError } from './errors/not-allowed-error';

interface EditAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type EditAnswerUseCaseResponse = Either<
	ResourceNotfounError | NotallowedError,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(private answerRepository: IAnswerRepository) {}

	async execute({ authorId, answerId, content }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return failure(new ResourceNotfounError());
		}

		if (authorId !== answer.authorId.toString()) {
			return failure(new NotallowedError());
		}

		answer.content = content;

		await this.answerRepository.save(answer);

		return success({
			answer,
		});
	}
}
