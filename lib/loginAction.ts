
import { signIn } from '@/app/(main)/(auth)/auth';
import { AuthError } from 'next-auth';
 
export const authenticate =  async (formData: FormData) => {
  const { username, password } = Object.fromEntries(formData)
  try {
    await signIn('credentials', {username, password});
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    throw error;
  }
}