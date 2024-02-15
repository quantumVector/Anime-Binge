import { Controller } from "effector-react-form";
import styles from './styles.module.scss';

type SelectProps = {
    controller: Controller;
};

export const Select: React.FC<SelectProps> = ({ controller }) => {
    const { input, error, isShowError } = controller();

    return (
        <>
            <select {...input} className={styles.select} defaultValue="main">
                <option value="main">Основной</option>
                <option value="home">Домашний</option>
                <option value="additional">Дополнительный</option>
            </select>
            {isShowError && <span className={styles.input__error}>{error}</span>}
        </>
    );
};