module.exports = function(environments) {

	const currentEnv = process.env.NODE_ENV;

	if(!environments[currentEnv]) {
		return;
	}

	if(environments[currentEnv].disabled) {
		console.log = function(){};
	}
};