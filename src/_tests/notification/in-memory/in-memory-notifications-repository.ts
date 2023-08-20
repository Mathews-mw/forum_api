import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { INotificaticationsRepository } from '@/domain/notification/application/repositories/implementations/INotificationsRepository';

export class InMemoryNotificationsRepository implements INotificaticationsRepository {
	public items: Notification[] = [];

	async create(notification: Notification) {
		this.items.push(notification);
	}
}
