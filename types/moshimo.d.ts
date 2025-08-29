export interface MoshimoProduct {
    amazon: string;
    rakuten: string;
    yahoo: string;
    imageUrl: string;
    name:string;
}

export type MoshimoProducts = {
    [key: string]: MoshimoProduct;
};