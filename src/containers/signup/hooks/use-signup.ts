import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signup } from '@/shared/api/auth.api';

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const useSignup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormValues>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormValues) => {
    if (data.password !== data.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      
      alert('회원가입 성공! 로그인해주세요.');
      router.push('/login');
      
    } catch (error: any) {
      const message = error.response?.data?.message || '회원가입 실패';
      alert(message);
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
    errors,
    password,
  };
};
