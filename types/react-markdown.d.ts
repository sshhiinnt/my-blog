import "react-markdown";

declare module "react-markdown" {
    interface Components {
        MoshimoLink?: React.ElementType;
    }
}