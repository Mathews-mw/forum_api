import { Question } from '../../enterprise/entities/question';
import { IAnswerRepository } from '../repositories/implementations/IAnswerRepository';
import { IQuestionRepository } from '../repositories/implementations/IQuestionRepository';

interface ChooseQuestionBestAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
	question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
	constructor(private questionRepository: IQuestionRepository, private answerRepository: IAnswerRepository) {}

	async execute({ authorId, answerId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			throw new Error('Answer not found.');
		}

		const question = await this.questionRepository.findById(answer.questionId.toString());

		if (!question) {
			throw new Error('Question not found.');
		}

		if (question.authorId.toString() !== authorId) {
			throw new Error('Not Allowed.');
		}

		question.bestAnswerId = answer.id;

		await this.questionRepository.save(question);

		return {
			question,
		};
	}
}
