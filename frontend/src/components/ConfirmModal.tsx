import styles from "../styles/global.module.css";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmModal({
  show,
  onClose,
  onConfirm,
  message,
}: ConfirmModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles.modal}>
        <p style={{ color: "black" }}>{message}</p>
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
