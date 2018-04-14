const lib = require('./');
const stdout = require("test-console").stdout;
const inspect = stdout.inspect();

const logEnvironment = () => {
	console.log(process.env.NODE_ENV)
};

const envs = {
  "production": {
    "disabled": true
  },
  "development": {
    "disabled": false
  },
  "staging": {
    "disabled": false
  }
};

describe("Basic functionality", () => {
	test("lib returns a function", () => {
		expect(typeof lib).toBe("function");
	});
	test("lib not reassign default console.log when current NODE_ENV not in environments object", () => {
		process.env.NODE_ENV = 'some_environment_not_in_environments';
		expect(console.log.toString()).toBe("function () { [native code] }");
	});
});


describe("Supressing console.logs with environments object", () => {
	beforeEach(() => {
  		process.env.NODE_ENV = 'production';
  		lib(envs);
	});

	test("lib supress console.log when environment set to production", () => {
		console.log("You should not see me, if it works correctly.");
		console.log("And me too!");
		expect(console.log.toString()).not.toEqual('function () { [native code] }');
	});

	afterEach(() => {
		delete console.log;
	});
});

describe("Not supressing console.logs", () => {
	beforeEach(() => {
  		process.env.NODE_ENV = 'development';
  		lib(envs);
	});

	test("lib doesn't supress console.log when environment set to development", () => {
		console.log("You should see me, if it works correctly.");
		console.log("And me too!");

		logEnvironment();

		inspect.restore();

		const firstMsg = inspect.output[1];
		const secondMsg = inspect.output[3];
		const envString = inspect.output[5];

		expect(firstMsg).toEqual(expect.stringContaining("You should see me, if it works correctly."));
		expect(secondMsg).toEqual(expect.stringContaining("And me too!"));
		expect(envString).toEqual(expect.stringContaining("development"));
	});

});