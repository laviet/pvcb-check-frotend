import moment from "moment";
export function testFunction() {
        alert("gff")
}
export function formatDateTime(value: any) {
        if(value==null){
         return "";
        }
        return moment(value).format("HH:mm:ss DD/MM/YYYY");
}