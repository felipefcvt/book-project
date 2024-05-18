import Link from '../../node_modules/next/link';
import styles from '../styles/global.module.css';

interface NotificationModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

export default function NotificationModal({ show, onClose, message }: NotificationModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
        <button><Link href={'/book/favorites'}>Ver favoritos</Link></button>
      </div>
    </div>
  );
};
