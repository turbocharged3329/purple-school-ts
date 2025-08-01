const obj: Record<string, number> = {
    a: 1,
    b: 2
}

type objectKeysType = number | string | symbol

function swapKeysAndValues<T extends objectKeysType, Y extends objectKeysType>(initialRecord: Record<T, Y>): Record<Y, T> {
    return Object.fromEntries(Object.entries(initialRecord).map(([key, value]) => [value, key]))
}

const res = swapKeysAndValues<string, number>(obj);
console.log(res)