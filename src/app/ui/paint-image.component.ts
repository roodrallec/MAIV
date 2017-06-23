import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

import * as synaptic from 'synaptic';

@Component({
  selector: 'app-paint-image',
  styles: [`
    #paint-image-canvas {
      width: 250;
      height: 250;
    }
  `],
  template: `
    <canvas id="paint-image-canvas"></canvas>
  `
})

export class PaintImageComponent {
  @ViewChild('paint-image-canvas') private canvas: ElementRef;

  public title = 'MAIV';
  private perceptron = null;
  private context = null;
  // size = 125 * 125;
  // iteration = 0;
  // px = null;
  //
  getData(imageObj) {
    context = this.canvas.getContext('2d');
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    return context.fillText(this.title, this.canvas.width/2, this.canvas.height/2);
  }

  train() {
    iteration = 0;
    perceptron = new Architect.Perceptron(2,15,3);
    image_data = getData(document.getElementById('twitter'));
    preview();
  }

  iterate() {
    for (var x = 0; x < 125; x+=1)
    {
      for(var y = 0; y < 125; y+=1)
      {
        var dynamicRate =  .01/(1+.0005*iteration);
        px = pixel(twitter,x,y)
        perceptron.activate([x/125,y/125]);
        perceptron.propagate(dynamicRate, pixel(image_data,x,y));
      }
    }
    preview();
  }

  pixel(data,x,y) {
    var red = data[((125 * y) + x) * 4];
    var green = data[((125 * y) + x) * 4 + 1];
    var blue = data[((125 * y) + x) * 4 + 2];

    return [red / 255, green / 255, blue / 255];
  }

  preview() {
    var imageData = context.getImageData(0, 0, 125, 125);
    for (var x = 0; x < 125; x++)
    {
      for(var y = 0; y < 125; y++)
      {
        var rgb = perceptron.activate([x/125,y/125]);
        imageData.data[((125 * y) + x) * 4] = (rgb[0] )* 255;
        imageData.data[((125 * y) + x) * 4 + 1] = (rgb[1] ) * 255;
        imageData.data[((125 * y) + x) * 4 + 2] = (rgb[2] ) * 255;
      }
    }
    context.putImageData(imageData,0,0);

    requestAnimationFrame(iterate);
  }
}
