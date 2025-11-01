import React from 'react'
import { techStackIcons, techStackImgs } from '../constants'
import TitleHeader from '../components/TitleHeader'
import TechIcon from '../components/models/techLogo/TechIcon'
import { useGSAP } from '@gsap/react'
import {gsap} from 'gsap'
const TechStack = () => {
  
  useGSAP(()=>{
    gsap.fromTo('.tech-card',{y:50,opacity:0},{
      y:0,
      opacity:1,
      duraction:1,
      ease:'power2.inOut',
      stagger:0.2,
      scrollTrigger:{
        trigger:"#skills",
        start:'top center'
      }
    })
  })
  return (
    <div id="skills" className='flex-center section-padding'>
      <div className='w-full h-full md:px-10 px-5'>
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝What I Bring to the Table"
        />

        <div className="tech-grid" >
          {techStackIcons.map((icon) => (
            <div key={icon.name} className='card-border tech-card overflow-x-hidden group xl:rounded-full rounded-lg'>
              <div className="teck-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={icon}/>
                </div>
                <div className="pading-x w-full">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}

           {/* {techStackImgs.map((icon) => (
            <div key={icon.name} className='card-border tech-card overflow-x-hidden group xl:rounded-full rounded-lg'>
              <div className="teck-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <img src={icon.imgPath}/>
                </div>
                <div className="pading-x w-full">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))} */}



        </div>
      </div>

    </div>
  )
}

export default TechStack
