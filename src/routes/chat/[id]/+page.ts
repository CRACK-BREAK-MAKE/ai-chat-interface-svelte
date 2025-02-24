export const load = ({ params }) => {
	console.log("session id page.js", params.id);
	return {
		sessionId: params.id
	};
};
