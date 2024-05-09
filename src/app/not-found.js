const Notfound = () => {
  return (
    <div className="overflow-hidden h-[100vh] ">
      <div className=" max-w-[1170px] h-[490px] mx-auto m-[50px] text-center bg-white ">
        <h1 className="text-[200px] font-bold text-violet-400"> 404!</h1>
        <h1 className="text-[50px]  text-black"> opps! Page not found</h1>
        <h3 className="text-[27px] py-[10px] ">
          {" "}
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </h3>

        <button className="bg-violet-400 px-[20px] py-[6px] rounded-[5px] text-white text-[18px]">
          HOME
        </button>
      </div>
    </div>
  );
};

export default Notfound;
