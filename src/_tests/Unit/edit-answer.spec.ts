import { makeAnswer } from '../factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerRepository } from '../in-memory/in-memory-answer-repository';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer-use-case';

let answerRepository: InMemoryAnswerRepository;
let editAnswerUseCase: EditAnswerUseCase;

describe('Edit Answer', () => {
	beforeEach(() => {
		answerRepository = new InMemoryAnswerRepository();
		editAnswerUseCase = new EditAnswerUseCase(answerRepository);
	});

	test('Should be able to edit a answer', async () => {
		const newAnswer = makeAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'));

		await answerRepository.create(newAnswer);

		await editAnswerUseCase.execute({ authorId: 'author-1', answerId: newAnswer.id.toValue(), content: 'Conteudo modificado' });

		expect(answerRepository.items[0]).toMatchObject({
			content: 'Conteudo modificado',
		});
	});

	test('Should not be able to edit a answer from another user', async () => {
		const newAnswer = makeAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'));

		await answerRepository.create(newAnswer);

		expect(() => {
			return editAnswerUseCase.execute({ authorId: 'author-2', answerId: newAnswer.id.toValue(), content: 'Conteudo modificado' });
		}).rejects.toBeInstanceOf(Error);
	});
});
