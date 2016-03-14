export function IntegerToHexString(number) {
    return number.toString(16);
}

export function AddLeadingZeros(number, n) {
    return ("0".repeat(n) + IntegerToHexString(number)).substr(-n);
}

export function GetRandomByte() {
    return Math.floor((Math.random() * 255) + 1);
}

export function GetRandomByteArray(n) {
    var data = new Array(n);
    for (var i = data.length - 1; i >= 0; i--) {
        data[i] = GetRandomByte();
    }

    return data;
}

export function IsHexCharacterCode(code) {
    return  code >= 0x30 && code <= 0x39 ||
            code >= 0x41 && code <= 0x46 ||
            code >= 0x61 && code <= 0x66;
}

export function GetASCIIOrDot(value) {
    if (value > 0x20 && value < 0x7f) {
        return String.fromCharCode(value);
    }

    return '.';
}

export function StringToArray(string, encoding) {
    if (encoding === undefined)
        encoding = "utf-8";

    var encoder = new TextEncoder(encoding);
    return encoder.encode(string);
}

export function ArrayToString(array_buffer, encoding) {
    if (encoding === undefined)
        encoding = "utf-8";

    var decoder = new TextDecoder(encoding);
    return decoder.decode(array_buffer);
}
