import React, { Component } from "react";
import './About.css';
import scrollToElement from 'scroll-to-element';

export default function About(props) {
  return (
    <section className='about'>
      <div className='about-content'>
        <header className='about-header'>
          <h1>What's Trippin'?</h1>
        </header>
        <p>
          Lorem ipsum dolor sit amet, est no aliquid eruditi, ea adhuc aperiri accusamus vix, primis docendi signiferumque eam at. Mea lobortis adipiscing concludaturque ut. Habeo eripuit id pri, mei cu bonorum nonumes interesset, vim aliquid consetetur consequuntur ne. Est ad impedit consulatu expetendis, cibo dolores adversarium an mei. An vix delenit epicuri dolores, in dicta philosophia vix, ea nec rebum virtute labores. Eam ei quidam vivendum. Ex eam dolorem persequeris, mei et antiopam platonem.
        </p>
      </div>
      <footer className='about-footer'>
        <h2 onClick={()=>scrollToElement('.login',{
          duration: 1000
        })}>Let's go Trippin'</h2>
      </footer>
    </section>
  )
}

// <p>
//   Detracto consequuntur no pri. Sea ea prima conceptam. Ei insolens explicari voluptaria duo. Impedit forensibus ei nam, mel odio quot aliquip eu. Aperiam complectitur et sed, alia aperiam eum ad. Quod illud mea ut, unum patrioque hendrerit et pri, te equidem dolorum qualisque ius.
// </p>
// <p>
//   Sanctus posidonium persequeris ad has, solet splendide referrentur ei cum. Cum verear iudicabit repudiandae et, qui ei mutat tractatos. Nam et omittam salutatus, sea et affert consulatu forensibus. In ferri maiorum verterem sed, per tincidunt sadipscing te. Mea fugit summo eu, elitr efficiendi ne sit. Persius explicari an ius, nulla erant usu cu.
// </p>
// <p>
//   Cum et fabulas pertinax. Nullam abhorreant eum id, delicata partiendo an vim. At dico praesent assentior est, per no wisi malorum. Vim eu commodo vocibus. Error legere audiam ut vix, eum te tollit verear intellegat, adipiscing quaerendum an sed. His lorem quaestio ex. Eu vero minim libris quo.
// </p>
