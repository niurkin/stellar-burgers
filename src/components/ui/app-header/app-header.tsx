import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
const linkClass = (isActive: boolean) =>  clsx(styles.link, { [styles.link_active]: isActive });;
const iconType = (isActive: boolean) => isActive ? 'primary' : 'secondary';

  return (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to={'/'} className={({ isActive }) => linkClass(isActive)}>
         {({isActive}) => (
          <>
          <BurgerIcon type={iconType(isActive)} />
          <span className='text text_type_main-default ml-2 mr-10'>Конструктор</span>
          </>
          )}
        </NavLink>
        <NavLink to={'/feed'} className={({ isActive }) => linkClass(isActive)}>
        {({isActive}) => (
          <>
          <ListIcon type={iconType(isActive)} />
          <span className='text text_type_main-default ml-2'>Лента заказов</span>
          </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <NavLink to={'/profile'} className={({ isActive }) => clsx(styles.link_position_last, linkClass(isActive))}>
      {({isActive}) => (
        <>
        <ProfileIcon type={iconType(isActive)} />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
        </>
        )}
      </NavLink>
    </nav>
  </header>
)};
