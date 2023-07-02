import { makeQuestion } from '../factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionRepository } from '../in-memory/in-memory-question-repository';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question-use-case';

let questionRepository: InMemoryQuestionRepository;
let editQuestionUseCase: EditQuestionUseCase;

describe('Edit Question', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		editQuestionUseCase = new EditQuestionUseCase(questionRepository);
	});

	test('Should be able to edit a question', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'));

		await questionRepository.create(newQuestion);

		await editQuestionUseCase.execute({ authorId: 'author-1', questionId: newQuestion.id.toValue(), title: 'Título modificado', content: 'Conteudo modificado' });

		expect(questionRepository.items[0]).toMatchObject({
			title: 'Título modificado',
			content: 'Conteudo modificado',
		});
	});

	test('Should not be able to edit a question from another user', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'));

		await questionRepository.create(newQuestion);

		expect(() => {
			return editQuestionUseCase.execute({ authorId: 'author-2', questionId: newQuestion.id.toValue(), title: 'Título modificado', content: 'Conteudo modificado' });
		}).rejects.toBeInstanceOf(Error);
	});
});
