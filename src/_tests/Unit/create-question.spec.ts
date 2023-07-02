import { InMemoryQuestionRepository } from '../in-memory/in-memory-question-repository';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question-use-case';

let questionRepository: InMemoryQuestionRepository;
let createQuestionUseCase: CreateQuestionUseCase;

describe('Create Question', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		createQuestionUseCase = new CreateQuestionUseCase(questionRepository);
	});

	test('Should be able to create a question', async () => {
		const { question } = await createQuestionUseCase.execute({
			authorId: '1',
			title: 'Nova pergunta',
			content: 'Conteúdo da pergunta',
		});

		expect(question.id).toBeTruthy();
		expect(questionRepository.items[0].id).toEqual(question.id);
	});
});
