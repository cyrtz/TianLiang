import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { count, map, startWith, take } from 'rxjs/operators';
import { slider } from './hello-slide.animation';


@Component({
  selector: 'app-slide-show',
  templateUrl: 'slide-show.component.html',
  styleUrls: ['slide-show.component.css'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideShowComponent {
  images = ['./assets/img/slide1.jpg', './assets/img/slide2.jpg', './assets/img/slide3.jpg'];
  carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    
    loop: true,
    touch: true, // touch is not currently in active for vertical carousel, will enable it in future build
    vertical: {
      enabled: false,
      height: 400
    }
  };
  tempData: any[];

  carouselTileItems$: Observable<number[]>;
   myStr : string[] = [
    "雲朵",
    "星空",
    "霓虹"
  ]
  constructor() {
    this.tempData = [];
    let int : number = 0;
    
    this.carouselTileItems$ = interval(500).pipe(
      startWith(-1),
      take(3),
      map(() => {
        const data = (this.tempData = [
          ...this.tempData,

          this.images[int++]
        ]);

        return data;
      })
    );
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: any) {
    console.log(data);
  }

  trackCarousel(_:any, item:any) {
    return item;
  }


}
