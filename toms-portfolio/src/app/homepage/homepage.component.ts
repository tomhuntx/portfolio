import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const chartWrapper = document.querySelectorAll('.chart-wrapper')[0];
    const chartWrapper2 = document.querySelectorAll('.chart-wrapper')[1];
    const scrollDown = document.querySelector(".scroll-down");
    const homeScreen = document.querySelectorAll('.nav-detach-point')[0];
    const nav = document.querySelector('.page-header');
    
    // window.addEventListener("scroll", scrollHandler);

    // Check if chart animation will not work (activates animation immediately)
    // let wontWork;
    // let ua = navigator.userAgent.toLowerCase();
    // if (ua.indexOf('chrome') == -1) wontWork = true;
    
    // function scrollHandler() {
    //     window.pageYOffset > 0
    //     ? scrollDown.classList.add("is-hidden")
    //     : scrollDown.classList.remove("is-hidden");
              
    //   // If first chart is in view - or webkit won't work, display chart animation
    //   if (isElementInViewport(chartWrapper, 150) || wontWork) chartWrapper.classList.add("in-view");
      
        
    //   // If second chart is in view - or webkit won't work, display chart animation
    //   if (isElementInViewport(chartWrapper2, 150) || wontWork) chartWrapper2.classList.add("in-view");
        
    //   // If home screen is in view
    //   if (!isElementInViewport(homeScreen, 1)) nav.classList.add("shadow");
    //   else nav.classList.remove("shadow");
    // }
  }

  // Is the given element (el) in the viewport? Use inc (int) to expand the view area in pixels 
  // isElementInViewport(el, inc): void {
    // var rect = el.getBoundingClientRect();
    // return (
    //   rect.top >= -150 &&
    //   rect.left >= 0 &&
    //   rect.bottom <=
    //     (window.innerHeight || document.documentElement.clientHeight) + inc &&
    //   rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    // );
  // }

}
