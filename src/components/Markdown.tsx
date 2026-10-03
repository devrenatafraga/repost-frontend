import ReactMarkdown from "react-markdown";
import styles from "./Markdown.module.css";

export function Markdown({ source }: { source: string }) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}
