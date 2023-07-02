import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { IAnswerRepository } from '@/domain/forum/application/repositories/implementations/IAnswerRepository';

export class InMemoryAnswerRepository implements IAnswerRepository {
	public items: Answer[] = [];

	async create(answer: Answer): Promise<void> {
		this.items.push(answer);
	}

	async save(answer: Answer): Promise<void> {
		const answerIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items[answerIndex] = answer;
	}

	async delete(answer: Answer): Promise<void> {
		const answerIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items.splice(answerIndex, 1);
	}

	async findById(id: string): Promise<Answer | null> {
		const answer = this.items.find((answer) => answer.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
		const answers = this.items.filter((item) => item.questionId.toString() === questionId).slice((page - 1) * 20, page * 20);

		return answers;
	}
}
