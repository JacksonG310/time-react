interface Rules<V, S> {
    value: V,
    rules: Array<{ strategy: keyof S | RegExp; errorMsg: string }>
}

interface Result {
    hasError: boolean;
    error: {
        [index: string]: string;
    }
}
interface Strategy {
    [K: string]: RegExp | ((value: any) => boolean)
}
class Valicator<S extends Strategy> {
    private readonly validators: S;
    private readonly rulesList: Array<Rules<any, S>>;
    constructor(validators: S) {
        this.validators = validators;
        this.rulesList = [];
    }


    private isRegExp(v: any): v is RegExp {
        return Object.prototype.toString.call(v) === "[object RegExp]";
    }

    public addRules(ruleArray: Array<Rules<any, S>>) {
        this.rulesList.push(...ruleArray);
        return this;
    }

    public validate(): Result {
        if (this.rulesList.length <= 0) {
            throw Error('there is no rules,you should call Validateor.addRules before call this method');
        }
        const error: { [index: string]: string } = {};
        this.rulesList.some(item => {
            if (item.rules.length === 0) {
                throw new Error("the length of rules must bigger than 0");
            }
            const value = item.value;
            const rules = item.rules;
            const allPass = rules.every((r, index) => {
                let isPass = false;
                if (this.isRegExp(r.strategy)) {
                    isPass = r.strategy.test(value);
                } else {
                    const strategy = this.validators![r.strategy] as Strategy[keyof Strategy];
                    if (this.isRegExp(strategy)) {
                        isPass = strategy.test(value);
                    } else {
                        isPass = strategy(value);
                    }
                }
                if (!isPass) {
                    error[index] = r.errorMsg;
                }
                return isPass;
            })
            return allPass;
        })
        return {
            hasError: Object.keys(error).length > 0,
            error
        }
    }

}

export default Valicator;