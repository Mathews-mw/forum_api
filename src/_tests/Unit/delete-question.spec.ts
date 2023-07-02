import { makeQuestion } from '../factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionRepository } from '../in-memory/in-memory-question-repository';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';

let questionRepository: InMemoryQuestionRepository;
let deleteQuestionUseCase: DeleteQuestionUseCase;

describe('Delete Question', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		deleteQuestionUseCase = new DeleteQuestionUseCase(questionRepository);
	});

	test('Should be able to delete a question', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'));

		await questionRepository.create(newQuestion);

		await deleteQuestionUseCase.execute({ authorId: 'author-1', questionId: 'question-1' });

		expect(questionRepository.items).toHaveLength(0);
	});

	test('Should not be able to delete a question from another user', async () => {
		const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'));

		await questionRepository.create(newQuestion);

		await deleteQuestionUseCase.execute({ authorId: 'author-1', questionId: 'question-1' });

		expect(() => {
			return deleteQuestionUseCase.execute({
				questionId: 'question-1',
				authorId: 'author-2',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
