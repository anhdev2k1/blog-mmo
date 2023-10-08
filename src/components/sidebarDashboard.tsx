'use client'
import Link from "next/link";
import {
  faLayerGroup,
  faHouse,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "@/styles/sidebarDashboard.module.css";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
interface ISidebar {
  display: string;
  icon: React.ReactElement;
  to: string;
  section: string;
  isActive: boolean
}
const sidebarNavItems: ISidebar[] = [
  {
    display: "Dashboard",
    icon: <FontAwesomeIcon icon={faHouse} />,
    to: "/dashboard",
    section: "dashboard",
    isActive: true
  },
  {
    display: "Dịch vụ",
    icon: <FontAwesomeIcon icon={faLayerGroup} />,
    to: "/dashboard/services",
    section: "services",
    isActive: false
  },
  {
    display: "Bài đăng",
    icon: <FontAwesomeIcon icon={faAddressBook} />,
    to: "/dashboard/posts",
    section: "posts",
    isActive: false
  },
];
const SidebarDashboard = () => {
  const pathName = usePathname()
  return (
    <div className={style.sidebar}>
      <h3 className={style.title}>Danh mục.</h3>
      {sidebarNavItems.map((item) => {
        return (
          <Link href={item.to}  className={style.sidebar__item} style={{textDecoration: 'none'}}>
            <div className={style.icon}>{item.icon}</div>
            <span className="sidebar__item-title">{item.display}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarDashboard;
