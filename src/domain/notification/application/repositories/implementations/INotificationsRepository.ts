import { Notification } from '@/domain/notification/enterprise/entities/notification';

export interface INotificaticationsRepository {
	create(notification: Notification): Promise<void>;
}
