import styles from "./style.module.scss";
import Logo from "../../assets/Logo.png";
import { TableList } from "../../components/TableList";
import { ToastContainer } from "react-toastify";

export const TablePage = () => {
  return (
    <div>
      <header className={`container ${styles.header}`}>
        <img src={Logo} alt="Hexagon" />
      </header>
      <main className={styles.main}>
        <div className="container">
          <TableList />
          <ToastContainer />
        </div>
      </main>
    </div>
  );
};
