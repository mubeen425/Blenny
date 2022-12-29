import React, { useEffect, useState } from 'react';

import { Bids, Hero, NewseLatter, Top_collection, Tranding_category } from '../../components/component';
import Meta from '../../components/Meta';
import axiosInstance from '../../utils/axiosInterceptor';

const Home_1 = () => {
  const [data, setData] = useState([]);
  
  const loadOnSaleItems = async () => {
    await axiosInstance
      .post("/nft/getNft", { isBuy: false })
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err, "it has an error"));
  };
  useEffect(() => {
    loadOnSaleItems();
  }, [])
  
  return (
    <>
      <Meta title="Home  || Blenny | NFT Marketplace Next.js Template" />
      <Hero />
      <Bids data={data} />
      <Top_collection />
      <Tranding_category />
      <NewseLatter />
    </>
  );
};

export default Home_1;
