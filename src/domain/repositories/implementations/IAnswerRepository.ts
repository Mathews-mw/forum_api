import { Answer } from '../../entities/answer';

export interface IAnswerRepository {
	create(answer: Answer): Promise<void>;
}
