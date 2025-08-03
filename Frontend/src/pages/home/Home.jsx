import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/exploreMenu/ExploreMenu'
import Itemdisplay from '../../components/displayItem/Itemdisplay'
import Appdownload from '../../components/downloadapp/Appdownload'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <Itemdisplay category={category} />
      <Appdownload/>
    </div>
  )
}

export default Home