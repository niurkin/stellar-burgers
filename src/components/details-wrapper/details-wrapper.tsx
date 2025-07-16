import { FC, ReactNode } from 'react';
import styles from './details-wrapper.module.css';

type TDetailWrapperProps = {
  title: string;
  children: ReactNode;
};

export const DetailsWrapper: FC<TDetailWrapperProps> = ({
  title,
  children
}) => (
  <>
    <div className={styles.main}>
      <div className={styles.header}>
        <h3 className='text text_type_main-large'>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  </>
);
