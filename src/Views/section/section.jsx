import React from 'react'
import Style from './section.module.css'

export default function Section() {
    return (
    <div className={Style.section}>
        <div className={Style.landing_text}>
        <h2>City: Skylines II</h2>
        <h3>
          <span>-32%</span>$24.77
        </h3>
       </div>
        <div className={Style.section_clip_path}/>
    </div>
  )

}