import Image from "next/image";

const Logo = () => {
    return ( <div>
         <div className="m-[20px]">
            <Image height={130} width={130} src="/logo.svg"></Image>
        </div>
    </div> );
}
 
export default Logo;