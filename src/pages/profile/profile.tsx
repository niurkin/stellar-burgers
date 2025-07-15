import { ProfileUI } from '@ui-pages';
import { TRegisterData } from '../../utils/burger-api';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  updateUser,
  selectUser,
  selectUserLoading
} from '../../services/userSlice';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);

  if (!user) {
    return null;
  }

  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData: Partial<TRegisterData> = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.password.trim() !== '') {
      updatedData.password = formValue.password;
    }

    dispatch(updateUser(updatedData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      isLoading={isLoading}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
