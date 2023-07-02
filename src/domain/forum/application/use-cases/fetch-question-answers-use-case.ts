import { Answer } from '../../enterprise/entities/answer';
import { IAnswerRepository } from '../repositories/implementations/IAnswerRepository';

interface FetchQuestionAnswersUseCaseRequest {
	questionId: string;
	page: number;
}

interface FetchQuestionAnswersUseCaseResponse {
	answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
	constructor(private answerRepository: IAnswerRepository) {}

	async execute({ questionId, page }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answerRepository.findManyByQuestionId(questionId, { page });

		return {
			answers,
		};
	}
}
