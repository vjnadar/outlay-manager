export type FlowType = "income" | "expense";
export type InitialOutlayFormState = {
    flowtype: FlowType;
    itype: string;
    etype: string;
    amount: string;
    iCustom: string;
    eCustom: string;
};
