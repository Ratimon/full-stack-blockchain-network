export = Transaction;

interface OutputMap {
    [id: string]: number;
}

interface Input {
    timestamp?: number;
    amount?: number;
    address: string;
    signature?: Signature;
}

interface Signature {
    r: string;
    s: string;
    recoveryParam: number;
}

declare class Transaction {
    constructor();
    id?: string;
    outputMap?: OutputMap;
    input?: Input;
}

declare namespace Transaction {
    export interface OutputMap {
        [id: string]: number;
    }
    
    export interface Input {
        timestamp?: number;
        amount?: number;
        address: string;
        signature?: Signature;
    }
    
    export interface Signature {
        r: string;
        s: string;
        recoveryParam: number;
    }
}
