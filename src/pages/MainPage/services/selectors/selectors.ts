import { StateSchema } from "app/providers/StoreProvider";

export const getArticlesData = (state: StateSchema) => state.mainPage?.data
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: CounterSchema) => counter.value,
// );

// export const getArticlesData = createSelector((state: StateSchema) => state.mainPage.data, (articles) => {
//     return articles
// })