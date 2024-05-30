"use client"
// app/search/page.js

import { useSearchParams } from 'next/navigation';

export const GetProgress = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  return (
    <div>
      
      {/* <p>Category ID: {categoryId}</p> */}
    </div>
  );
};

export default GetProgress;
