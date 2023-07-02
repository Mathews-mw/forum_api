import { IQuestionRepository } from '../repositories/implementations/IQuestionRepository';

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			throw new Error('Question not found.');
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error('Not allowed');
		}

		await this.questionRepository.delete(question);

		return {};
	}
}
