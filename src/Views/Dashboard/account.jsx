import React from "react";
import Style from './account.module.css'
import AccountNav from "./accountNav/accountNav";
import { useParams } from "react-router-dom";


export default function Account() {
    const { id } = useParams()
    
    return (
        <main className={Style.dashboard}>
            <AccountNav/>
        </main>
    )
}