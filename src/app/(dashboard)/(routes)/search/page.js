"use client";
import axios from "axios";
import {Categories} from "./_components/categories"
import { useEffect, useState } from "react";

export async function loader() {
    const res = await axios.get("http://localhost:3000/api/category");
    return res;  // Ensure you return the data part of the response
}

const Search = () => {
    const [categ, setCateg] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const categoryData = await loader();
          console.log(categoryData.data)        
          setCateg(categoryData.data)
        }
        fetchData();
    },[])

    return ( 
        <div>
        {categ ? 
            <Categories data={categ}/> :<p> loading...</p>
        }
        </div>
     );
}

export default Search;