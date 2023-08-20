import { makeQuestion } from '../factories/make-question';
import { InMemoryQuestionRepository } from '../in-memory/in-memory-question-repository';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question-use-case';
import { InMemmoryQuestionCommentsRepository } from '../in-memory/in-memmory-question-comments-repository';

let questionRepository: InMemoryQuestionRepository;
let commentQuestionUseCase: CommentOnQuestionUseCase;
let questionCommentRepository: InMemmoryQuestionCommentsRepository;

describe('Comment on Question', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		questionCommentRepository = new InMemmoryQuestionCommentsRepository();
		commentQuestionUseCase = new CommentOnQuestionUseCase(questionRepository, questionCommentRepository);
	});

	test('Should be able to comment on question', async () => {
		const question = makeQuestion();

		await questionRepository.create(question);

		await commentQuestionUseCase.execute({
			authorId: question.authorId.toString(),
			questionId: question.id.toString(),
			content: 'Comentário teste',
		});

		expect(questionCommentRepository.items[0].content).toEqual('Comentário teste');
	});
});
