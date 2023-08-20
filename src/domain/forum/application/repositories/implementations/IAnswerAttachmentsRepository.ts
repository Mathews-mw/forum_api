import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

export interface IAnswerAttchmentsRepository {
	findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
	deleteManyByAnswerId(answerId: string): Promise<void>;
}
