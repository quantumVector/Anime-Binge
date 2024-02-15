import { Controller } from "effector-react-form";
import styles from './styles.module.scss';

type InputProps = {
    controller: Controller;
    label?: React.ReactNode;
};

export const Input: React.FC<InputProps> = ({ controller, label }) => {
    const { input, error, isShowError } = controller();

    return (
        <label className={styles.input}>
            {label && <span>{label}</span>}
            <input {...input} value={input.value || ''} />
            {isShowError && <span className={styles.input__error}>{error}</span>}
        </label>
    );
};