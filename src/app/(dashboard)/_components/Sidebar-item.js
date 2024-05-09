import Link from "next/link";


const Sidebaritem = ({label,icon:Icon,href}) => {
  
    return ( 
        <div className="flex flex-row">
         
        <Link className="flex gap-2 text-blue-400 hover:text-red-400" href={href}>
        
            {<Icon /> }{label}
         </Link>
         
        </div>
     );
}
 
export default Sidebaritem;