import Image from "next/image";
import styles from "./page.module.scss";
import localFont from 'next/font/local'

// const myFont = localFont({
//   src: '/public/fonts/PsycherosRegular.otf'
// })

export default function Home() {
  return (
    <div className={styles.title}>
      <div>Louisa Yonzon</div>
      <div>Web Developer</div>
    </div>
  );
}
