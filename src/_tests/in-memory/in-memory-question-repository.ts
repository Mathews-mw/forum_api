import { Question } from '@/domain/forum/enterprise/entities/question';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { IQuestionRepository } from '@/domain/forum/application/repositories/implementations/IQuestionRepository';

export class InMemoryQuestionRepository implements IQuestionRepository {
	public items: Question[] = [];

	async create(question: Question): Promise<void> {
		this.items.push(question);
	}

	async save(question: Question): Promise<void> {
		const questionIndex = this.items.findIndex((item) => item.id === question.id);

		this.items[questionIndex] = question;
	}

	async delete(question: Question): Promise<void> {
		const questionIndex = this.items.findIndex((item) => item.id === question.id);

		this.items.splice(questionIndex, 1);
	}

	async findById(id: string): Promise<Question | null> {
		const question = this.items.find((question) => question.id.toString() === id);

		if (!question) {
			return null;
		}

		return question;
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find((question) => question.slug.value === slug);

		if (!question) {
			return null;
		}

		return question;
	}

	async findManyRecent({ page }: PaginationParams) {
		const questions = this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice((page - 1) * 20, page * 20);

		return questions;
	}
}
