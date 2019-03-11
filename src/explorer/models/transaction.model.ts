export interface Transaction {
    id: string;
    outputMap: OutputMap;
    input: Input;
}

export interface OutputMap {
    [id: string]: number
}

export interface Input {
    timestamp: number;
    amount: number;
    address: string;
    signature: Signature;
}

export interface Signature {
    r : string;
    s : string;
    recoveryParam : number
}