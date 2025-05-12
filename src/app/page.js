import Image from "next/image";
import styles from "./page.module.scss";
import AnimatedText from "./component/AnimatedText";

export default function Home() {
  return (
    <div className={styles.title}>
      <AnimatedText once text="Louisa Yonzon" el="p" />
      <AnimatedText once text="Web Developer" el="p" />
    </div>
  );
}
