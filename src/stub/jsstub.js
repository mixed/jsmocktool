import StubMethod from './jsstubMethod';
import TestDouble from '../testDouble';
import global from '../global';

function warn(msg) {
	if (global.console && console.warn) {
		console.warn(msg);
	}
}

class Stub extends TestDouble {
	constructor(name, type = 'object') {
		super(name, type);
		this.type = 'Stub';
		warn('[WARN] : Deprecated Stub. You should be change to Mock.');
	}
	should_receive(functionName) {
		this.getTestDouble()[functionName] = () => {
			if (this.returnValue !== '_js_stub_none') {
				return this.returnValue;
			}
		};
		return new StubMethod(this);
	}
}

export default function stubWrap(name, type) {
	if (this instanceof Stub) {
		this.createTestDouble(name, type);
	} else {
		return new Stub(name, type);
	}
}

stubWrap.OBJECT = 'object';
stubWrap.INSTANCE = 'instance';
