import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { InMemoryQuestionRepository } from '../in-memory/in-memory-question-repository';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { makeQuestion } from '../factories/make-question';

let questionRepository: InMemoryQuestionRepository;
let getQuestionBySlugUseCase: GetQuestionBySlugUseCase;

describe('Get Question by Slug', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(questionRepository);
	});

	it('Should be able to get a question by slug', async () => {
		const newQuestion = makeQuestion({ slug: Slug.create('example-question') });

		await questionRepository.create(newQuestion);

		const { question } = await getQuestionBySlugUseCase.execute({ slug: 'example-question' });

		expect(question.id).toBeTruthy();
		expect(question.title).toEqual(newQuestion.title);
	});
});
