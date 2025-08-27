import ReactMarkdown from "react-markdown";
import MoshimoLink from "./moshimoLink";
import products from "@/data/moshimoProducts.json";

type Props = {
    content: string,
};


export default function MarkdownWithMoshimo({ content }: Props) {
    const components = {
        blockquote({ children }: any) {
            const text = String(children);
            const todoMatch = text.match(/TODO:(.+)/);
            if (todoMatch) {
                const name = todoMatch[1].trim();
                const data = (products as any)[name];
                if (!data) return <blockquote>{children}</blockquote>;
                return <MoshimoLink {...data} />
            }
            return <blockquote>{children}</blockquote>
        },
    };
    return <ReactMarkdown components={components}>{content}</ReactMarkdown>
}