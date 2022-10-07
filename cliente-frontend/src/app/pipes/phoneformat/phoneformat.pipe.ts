import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  private empty = "";
  
  transform(number = this.empty) {
    let formated = "(";
    
    formated += number.slice(0,3) + ") " + number.slice(3,6) + "-" + number.slice(6);
    return formated;
  }
  
} 