import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { IQuestionRepository } from '../repositories/implementations/IQuestionRepository';

interface GetQuestionBySlugUseCaseRequest {
	slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionRepository.findBySlug(slug);

		if (!question) {
			throw new Error('Question not fount.');
		}

		return {
			question,
		};
	}
}
