import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { Button } from "./components/ui/button"
import { useUser } from "@clerk/clerk-react"
import Header from "./components/Custom/Header";
import { Toaster } from "./components/ui/sonner";



export default function App() {
  const {User,isLoaded,isSignedIn}=useUser();
  if(!isSignedIn&&isLoaded){
    return <Navigate to={'/auth/sign-in'}/>
  }
  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster/>
    </>
  )
}