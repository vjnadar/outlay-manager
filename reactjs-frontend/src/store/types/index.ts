import store from "..";

const storeState = store();
export type RootState = ReturnType<typeof storeState.getState>;
