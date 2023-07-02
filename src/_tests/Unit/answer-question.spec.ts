import { InMemoryAnswerRepository } from '../in-memory/in-memory-answer-repository';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question-use-case';

let answerRepository: InMemoryAnswerRepository;
let answerQuestionUseCase: AnswerQuestionUseCase;

describe('Answer Question', () => {
	beforeEach(() => {
		answerRepository = new InMemoryAnswerRepository();
		answerQuestionUseCase = new AnswerQuestionUseCase(answerRepository);
	});

	test('Should be able to create an answer', async () => {
		const { answer } = await answerQuestionUseCase.execute({
			instructorId: '1',
			questionId: '1',
			content: 'Nova resposta',
		});

		await answerRepository.create(answer);

		expect(answer.content).toEqual('Nova resposta');
		expect(answerRepository.items[0].id).toEqual(answer.id);
	});
});
