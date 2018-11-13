export class DateUtils {
    public static getGMT1Date(indate: string){
        var date = new Date(indate);
        var offset = new Date().getTimezoneOffset();
        var hours = offset/60 * (-1);
        var utcDate = date;
        utcDate.setHours(utcDate.getHours()+6); //there is Central Standard Time in database so we need to add 6h to receive utc
        utcDate.setHours(utcDate.getHours()+hours);

        return utcDate;
    }
}