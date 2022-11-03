export function tableHeaderColor() {
        return {
                background: '#409eff',
                color: '#FFFFFF'
        };
}
export function tableHeaderColorTwo() {
        return {
                background: '#909399',
                color: '#FFFFFF'
        };
}
export function formatCurrencyInputVND() {
        return {
                currency: 'VND',
                locale: 'de-DE'
        }
}
export function formatNumber(value: number) {
        const val = (value / 1).toFixed(2).replace(",", ".");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formarCurrencyPrintVND = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 2,
});

