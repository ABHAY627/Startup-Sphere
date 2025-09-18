import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import {auth,signOut,signIn} from "@/Auth";

// server side rendering chal rhi bhot achhe se
//ye async vali functionality vahin se aayi hai
const Navbar = async () => {
    const session = await auth();
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src="/logo.png" alt="logo" width={144} height={40} />
                </Link>
                <div className="flex items-center gap-5 text-black">
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form
                                action={async () => {
                                    "use server";

                                    await signOut({ redirectTo: "/" });
                                }}
                            >
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session.user.id}`}>
                                <span>{session.user.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github");
                            }}
                        >
                            <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
