import React, { useEffect, useState } from 'react';

import { Bids, Hero, NewseLatter, Top_collection, Tranding_category } from '../../components/component';
import Meta from '../../components/Meta';

const Home_1 = () => {
  
  
 
  
  return (
    <>
      <Meta title="Home  || Blenny | NFT Marketplace Next.js Template" />
      <Hero />
      <Bids />
      <Top_collection />
      <Tranding_category />
      <NewseLatter />
    </>
  );
};

export default Home_1;
