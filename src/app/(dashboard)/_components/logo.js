import Image from "next/image";

const Logo = () => {
    return ( 
    <div>
        <div class = " max-w-[200px] h-[120px] mx-auto  text-center bg-white flex justify-center items-center ">
        <div>
        <h1 class =" text-[80px] mt-[81px] text-blue-500 ">K</h1>
        </div>
        <div class="relative items-center mt-[123px]">

        <img class =" absolute bottom-[6px]  " src="https://www.svgrepo.com/show/475371/light-bulb.svg" />
        <h1 class ="font-bold text-[20px]  text-blue-500  ">EEP LEARNING</h1>
        </div>
        </div>
    </div> 
    );
}
 
export default Logo;