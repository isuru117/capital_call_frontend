export function formatIBAN(iban: string): { formattedIBAN: string; isValid: boolean } {
    const cleanedIBAN = iban.replace(/\s+/g, '').toUpperCase()

    const formattedIBAN = cleanedIBAN.replace(/(.{4})/g, '$1 ').trim()

    const ibanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/
    const isValid = ibanPattern.test(cleanedIBAN)

    return { formattedIBAN, isValid }
}

export function formatAmount(value: number): number {
    if (value !== null && !isNaN(value)) {
        return parseFloat(value.toFixed(2))
    }
    return value
}

export function formatIBANstring(iban: string): string {
    if (iban == null) return "";
    return iban.replace(/(.{4})/g, '$1 ').trim()
}
