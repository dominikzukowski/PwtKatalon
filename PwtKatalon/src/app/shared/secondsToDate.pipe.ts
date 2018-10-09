import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsToDate',
})

export class SecondsToDatePipe implements PipeTransform {
    
    transform(value: any,) {
        if (value < 0)
            return "00:00:00";

    var hours = Math.floor(value / 3600),
        minutes = Math.floor((value % 3600) / 60),
        seconds = Math.floor(value % 60);

        return this.padTime(hours) + ":" + this.padTime(minutes) + ":" + this.padTime(seconds);
    }

    padTime(t) {
        return t < 10 ? "0"+t : t;
    }

}