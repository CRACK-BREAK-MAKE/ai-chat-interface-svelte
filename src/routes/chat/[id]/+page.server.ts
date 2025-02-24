import { type Actions, fail } from '@sveltejs/kit';

export const actions = {
	inference: async ({ request }) => {
		const data = await request.formData();
		const query = data.get('query')?.toString();

		if (!query?.trim()) {
			return fail(400, {
				missing: true,
				msg: 'Please enter your query!'
			});
		}

		// Just validate and return success
		return { success: true, query };
	}
} satisfies Actions;
