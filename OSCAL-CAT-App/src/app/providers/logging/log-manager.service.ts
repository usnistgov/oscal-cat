import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogManagerService {

  constructor() { }

  public logData(data: object, level: number = 0) {
    if (level > 3) {
      return;
    }
    Object.keys(data).forEach(key => {
      const spacer = '\t'.repeat(level + 1);
      if (!!data[key]) {
        if (typeof (data[key]) in ['string', 'boolean', 'number']) {
          console.log(`${spacer}Key:'${key}';\n${spacer}Value:'${data[key]}';`);
        } else if (!!data[key] && Array.isArray(data[key])) {
          console.log(`${spacer}Key:'${key}'; TypeOf:'Array';`);
          if (data[key].length > 0) {
            data[key].forEach((element, index: number) => {
              if (!!data[key]) {
                console.log(`${spacer}\tValue[${index}]:${element} TypeOf:${typeof element};`);
              }
            });
          } else {
            console.log(`${spacer}\t::'<...Empty-Array...>';`);
          }
        } else if (typeof (data[key]) === 'object') {
          console.log(`${spacer}Key:'${key}';\n${spacer}TypeOf:'object';`);
          this.logData(data[key], level + 1);
        } else {
          console.log(`${spacer}Key:'${key}';\n${spacer}Value:'${data[key]}';`);
        }
      }
    });
    level = level > 0 ? level - 1 : 0;
  }

}
