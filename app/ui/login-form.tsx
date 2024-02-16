'use client'
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import { setUserDetails } from '../GlobalRedux/Features/userCred';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {

  const dispatch = useDispatch()
  const router = useRouter()

  const formik = useFormik({

    initialValues: { username: '', password: '', } as LoginFormValues,
    validationSchema: Yup.object({
      username: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),

    onSubmit: async (values) => {
      try {
        // Perform your login API call here, using the provided values
        const response = await axios.get('http://localhost:8000/login', { params: values });

        if (response.status === 200) {
          dispatch(setUserDetails(response.data.user))
          localStorage.setItem('token', response.data.user._id)
          router.push('/dashboard');

        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  });



  return (
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
      <div className="flex-1 px-6 pb-10 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-white`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${formik.errors.username ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                name="username"
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.username}</div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${formik.errors.password ? 'border-red-500' : ''}`}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                minLength={6}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
            )}
          </div>
        </div>
        <Button className="mt-4 w-full" type='submit'>
           Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}
