import { makeAnswer } from '../factories/make-answer';
import { InMemoryAnswerRepository } from '../in-memory/in-memory-answer-repository';
import { InMemmoryAnswerCommentsRepository } from '../in-memory/in-memmory-answer-comment-repository';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-anwer-use-case';

let answerRepository: InMemoryAnswerRepository;
let commentAnswerUseCase: CommentOnAnswerUseCase;
let answerCommentRepository: InMemmoryAnswerCommentsRepository;

describe('Comment on Answer', () => {
	beforeEach(() => {
		answerRepository = new InMemoryAnswerRepository();
		answerCommentRepository = new InMemmoryAnswerCommentsRepository();
		commentAnswerUseCase = new CommentOnAnswerUseCase(answerRepository, answerCommentRepository);
	});

	test('Should be able to comment on answer', async () => {
		const answer = makeAnswer();
		answerRepository.create(answer);

		await commentAnswerUseCase.execute({
			authorId: answer.authorId.toString(),
			answerId: answer.id.toString(),
			content: 'Comentário teste',
		});

		expect(answerCommentRepository.items[0].content).toEqual('Comentário teste');
	});
});
