import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialchars'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/[^\w\s]/gi, ' ')
    
  }

}
