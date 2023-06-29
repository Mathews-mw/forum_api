import { Slug } from '../../domain/entities/value-objects/slug';

it('Should be able to create a new slug from text', () => {
	const slug = Slug.createFromText('Example question tItle');

	expect(slug.value).toEqual('example-question-title');
});
