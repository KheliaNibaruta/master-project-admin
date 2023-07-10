import clientPromise from '@/lib/mongobd'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ['knibaruta@gmail.com'];

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
],
adapter: MongoDBAdapter(clientPromise),
callbacks: {
  session: ({session,token,user}) => {
    if (adminEmails.includes(session?.user?.email)) {
      return session;
    } else {
      return false
    }
    
  },
},
}

export default NextAuth(authOptions);

export async function isAdminRequest(res,req) {
  const session = await getServerSession(res,req,authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not admin';
  }
}