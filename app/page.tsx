'use client'
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function Page() {

  const router = useRouter()

  useEffect(() => {
    const userCred = localStorage.getItem("token");
    if (!userCred) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (<></>);
}
