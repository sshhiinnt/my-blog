import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

export default function rehypeMoshimo() {
    return (tree: Root) => {
        visit(tree, "element", (node: Element) => {
            if (node.tagName === "span" && node.properties?.["data-moshimo"]) {
                node.tagName = "span";
                const className = node.properties.className ?? [];
                const classArray = Array.isArray(className)
                    ? className.filter(c => typeof c === "string" || typeof c === "number")
                    : typeof className === "string" || typeof className === "number"
                        ? [className]
                        : [];
                node.properties.className = [...classArray, "moshimo-link"];
            }
        });
    };
}   