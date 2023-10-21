"use client"
import { useAppSelector } from "@/redux/hooks";
import style from "@/styles/navbarDashboard.module.css"
const NavbarDashboard = () => {
    const getCurrentUser = useAppSelector(state => state.userReducer.user)
    return ( 
        <nav className={style.navbar}>
            <span className={style.logo}>Tiến long.</span>

            <span className="info__user">{`Chào, ${getCurrentUser?.username} !`}</span>
        </nav>
     );
}
 
export default NavbarDashboard;