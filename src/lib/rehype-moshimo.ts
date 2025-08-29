import { visit } from "unist-util-visit";

export default function rehypeMoshimo() {
    return (tree: any) => {
        visit(tree, "element", (node) => {
            if (node.tagName === "span" && node.properties?.["data-moshimo"]) {
                node.tagName = "span";
                node.properties.className = (node.properties.className || []).concat("moshimo-link");
            }
        });
    };
}   