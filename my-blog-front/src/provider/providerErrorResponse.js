'use strict';

class ErrorResponse {
	constructor(errorCode, errorDesc, friendlyDesc, innerError) {
		this._errorCode = errorCode;
		this._errorDesc = errorDesc;
		this._friendlyDesc = friendlyDesc;
		this._innerError = innerError;
	}

	get errorCode() {
		return this._errorCode;
	}

	get errorDesc() {
		return this._errorDesc;
	}

	get friendlyDesc() {
		if (this._innerError)
			return `(${this._innerError})  ${this._friendlyDesc} `;
		else
			return this._friendlyDesc;
	}

	get innerError() {
		return this._innerError;
	}
}

export default ErrorResponse;