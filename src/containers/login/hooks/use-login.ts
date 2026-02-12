import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '@/shared/api/auth.api';
import { useTokenStore } from '@/shared/store/token-store';
import { useUserStore } from '@/shared/store/user-store';

interface LoginFormValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      useTokenStore.getState().setTokens(result.access_token, result.access_token);
      useUserStore.getState().setUser(result.user);
      
      alert('로그인 성공!');
      router.push('/');
    } catch (error) {
      alert('로그인 실패: 이메일과 비밀번호를 확인해주세요.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};
