import moment from "moment";
export function testFunction() {
        alert("gff")
}
export function formatDateTime(value: any) {
        return moment(value).format("DD-MM-YYYY HH:SS");
}