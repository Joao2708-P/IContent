import styles from "../../../styles/Components/Fotter.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.corpo}>
        <h3>@Copyrinthing2023</h3>
        <div className={styles.company}>
          <span>Company</span>
          <br />
          <Link href="/#">About</Link>
          <Link href="/#">IA</Link>
          <Link href="/#">History</Link>
          <Link href="/#">Courses</Link>
        </div>

        <div className={styles.information}>
          <span>Information</span>
          <br />
          <Link href="/#">Politics</Link>
          <Link href="/#">Meet the teachers</Link>
          <Link href="/#">Contact</Link>
          <Link href="/#">Services</Link>
        </div>

        <div className={styles.follows}>
          <span>Follows</span>
          <br />
          <Link href="/#">Instagram</Link>
          <Link href="/#">Facebook</Link>
          <Link href="/#">Twitter</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
