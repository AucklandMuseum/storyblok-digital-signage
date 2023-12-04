/**
 * @type {import("astro").MiddlewareResponseHandler}
 */
// `context` and `next` are automatically typed
import { sequence } from "astro:middleware";

export const onRequest = (context, next) => {
	return next();
};