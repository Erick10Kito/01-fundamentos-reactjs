import FundoUser from "../assets/FundoUser.svg";
import styles from "./Sidebar.module.css";
import { PencilLine } from "phosphor-react";
import { Avatar } from "./Avatar";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src={FundoUser} alt="" />
      <div className={styles.profile}>
        <Avatar src="https://github.com/Erick10Kito.png" />

        <strong>Erick Campos</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
