import { Answer } from '../../../entities/answer';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';
import { IAnswerRepository } from '../../../repositories/implementations/IAnswerRepository';

interface AnswerQuestionUseCaseRequest {
	instructorId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	constructor(private answerRepository: IAnswerRepository) {}

	async execute({ questionId, content, instructorId }: AnswerQuestionUseCaseRequest) {
		const answer = Answer.create({
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
			content,
		});

		await this.answerRepository.create(answer);

		return answer;
	}
}
