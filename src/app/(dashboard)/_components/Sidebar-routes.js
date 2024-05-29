"use client"
import { usePathname, useRouter } from "next/navigation";
import Sidebaritem from "./Sidebar-item";
import { BarChart, BookText, Compass, FileSearch, Layout } from "lucide-react";
// const use = useRouter()

const items = [{
    label:"Browse",
    icon:FileSearch,
    href:'/search'
},
{
    label:"Dashboard",
    icon:Layout,
    href:'/'
}]


const items2 = [
{
    label:"Couses",
    icon:BookText,
    href:'/teacher/courses'
},
{
    label:"Analytics",
    icon:BarChart,
    href:'/teacher/analytics'
}
]

const Sidebarroutes = ({name}) => {
    const path = usePathname()
    const item = path.includes('/teacher') ? items2 : items;
    return ( 
     
        <div className="mt-[83px] flex flex-col gap-8 ml-[90px]">
           {
            item.map((i)=>(
                <Sidebaritem
                    key={i.href}
                    icon={i.icon}
                    label={i.label}
                    href={i.href}
                />
            ))
            }
           
        </div>
        
     );
}
 
export default Sidebarroutes;