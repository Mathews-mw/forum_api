import { randomUUID } from 'node:crypto';
import { UniqueEntityId } from './unique-entity-id';

export class Entity<Props> {
	private _id: UniqueEntityId;

	// O protected, diferente do private, é uma propriedade que pode ser acessada tanto pela própria classe e também por todas as classes que extende esse clase;
	protected props: Props;

	get id() {
		return this._id;
	}

	protected constructor(proprs: Props, id?: UniqueEntityId) {
		this.props = proprs;
		this._id = id ?? new UniqueEntityId();
	}
}
