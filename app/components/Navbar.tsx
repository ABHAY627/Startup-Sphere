import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import { auth, signOut, signIn } from "@/Auth";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';

// server side rendering chal rhi bhot achhe se
// ye async vali functionality vahin se aayi hai
const Navbar = async () => {
    const session = await auth();
    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src="/logo.png" alt="logo" width={144} height={40} />
                </Link>
                <div className="flex items-center justify-between min-w-[340px] gap-6 text-black ml-auto">
                    {session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>
                                    CREATE
                                </span>
                            </Link>
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" });
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#7B2D26",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#5A1F19"
                                        }
                                    }}
                                    type="submit"
                                >
                                    Logout
                                </Button>
                            </form>
                            <Link href={`/user/${session.user.id}`}>
                                <Avatar sx={{ bgcolor: "#000000", color: "#fff" }} src="/broken-image.jpg" />
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github");
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#7B2D26",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "#5A1F19"
                                    }
                                }}
                                type="submit"
                            >
                                Login
                            </Button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
