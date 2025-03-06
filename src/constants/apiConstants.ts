export const API_URLS = {
	USERS: `users`,
	FILTERS: "api/v1/resolvers/doubts/allowedFilters",
	DOUBTS: "api/v1/doubts/resolvers/doubts",
	COUNT_DATA: "api/v1/doubts/resolvers/count",
	CONVERSATION_ON_DOUBT: "api/v1/v2/doubts/DOUBT_ID/conversation",
	NEW_CONVERSATION_ON_DOUBT: "api/v1/v3/doubts/DOUBT_ID/conversation",
	GET_PRESIGNED: "api/v1/doubts/presigned",
	GET_FILE_URL: "api/v1/doubts/file/url/FILE_ID",
	SEND_REPLY: "api/v1/doubts/DOUBT_ID/reply",
	SUPPORT: "api/v1/doubts/DOUBT_ID/mark_support",
	REASSIGN_DOUBT: "api/v1/doubts/DOUBT_ID/reassign_doubt",
	SUBMIT_QUESTION : "api/v1/v6/doubts/submit"
}

export const API_BASE_URL = "http://doubt-bff.co-200932-http.allen-stage.in:80/"
