import { Question } from '@/domain/forum/enterprise/entities/question';
import { IQuestionRepository } from '../repositories/implementations/IQuestionRepository';

interface FetchRecentQuestionsUseCaseRequest {
	page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
	questions: Question[];
}

export class FetchRecentQuestionsUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return {
			questions,
		};
	}
}
