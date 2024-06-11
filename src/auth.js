import NextAuth from "next-auth";
import Users from "./models/user";
import connectDB from "./lib/db";
import bcrypt from 'bcryptjs'
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({

      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        await connectDB();
        const email = credentials.email;
        const password = credentials.password;
      
        if (!email || !password) {
          throw new Error("Please enter email and password both");
        }
      
        const user = await Users.findOne({ email });
        if (!user) {
          throw new Error("User not exist");
        }
      
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          return { name: user.name, email: user.email, id: user._id }; // Ensure this is correct
        } else {
          return null; // Important for indicating incorrect credentials
        }
      },
      
    }),
  ],
  pages: {
    signIn: "/signup",
  },
  // cookies: {
  //   sessionToken: {
  //     name: '__Secure-authjs.session-token', 
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: process.env.NODE_ENV === 'production',
  //     },
  //   },
  //   callbackUrl: {
  //     name: '__Secure-authjs.callback-url',
  //     options: {
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: process.env.NODE_ENV === 'production',
  //     },
  //   },
  //   csrfToken: {
  //     name: '__Secure-authjs.csrf-token',
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: process.env.NODE_ENV === 'production',
  //     },
  //   },
  // },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      await connectDB();
      const { email,name } = user;
      if (account.provider === "google") {
        let existingUser = await Users.findOne({ email });
        if (!existingUser) {
          existingUser = await Users.create({
            name,
            email,
            googleId: profile.sub, // Use 'sub' from profile which is the Google ID
          });
        }
        return true; // Should return true to indicate successful sign-in
      }
      if (account.provider === "credentials") {
        const user = await Users.findOne({ email });
        return !!user; // Simplified to return true or false based on existence
      }
      return false; // Fallback in case none of the conditions above are met
    }
  },
});

