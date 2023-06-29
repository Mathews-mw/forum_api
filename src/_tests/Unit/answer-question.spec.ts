import { Answer } from '../../domain/entities/answer';
import { AnswerQuestionUseCase } from '../../domain/forum/application/usee-cases/answer-question-use-case';
import { IAnswerRepository } from '../../domain/repositories/implementations/IAnswerRepository';

const fakeAnswerRepository: IAnswerRepository = {
	create: async (answer: Answer) => {},
};

test('Create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

	const answer = await answerQuestion.execute({
		instructorId: '1',
		questionId: '1',
		content: 'Nova resposta',
	});

	expect(answer.content).toEqual('Nova resposta');
});
