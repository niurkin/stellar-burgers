import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useClearErrorOnUnmount } from '../../hooks/useClearErrorOnUnmount';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  selectUserError,
  selectUserLoading
} from '../../services/userSlice';
import { Preloader } from '../../components/ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useClearErrorOnUnmount();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
