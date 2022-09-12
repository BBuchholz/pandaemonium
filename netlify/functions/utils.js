exports.getId = (urlPath) => {
	return urlPath.match(/([^\/]*)\/*$/)[0];
}