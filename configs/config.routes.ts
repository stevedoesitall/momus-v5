import { Router } from "express";

class RouterConfig {
	public router: Router;
	public _name = "";

	constructor(router = Router()) {
		this.router = router;
	}
	
	set name(value: string) {
		this._name = "/" + value;
	}

	get name(): string {
		return this._name;
	}

	public printSummary(): void {
		console.log(`${this._name} router running.`);
	}
} 

export { RouterConfig };
