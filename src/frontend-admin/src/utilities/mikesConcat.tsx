export const concatStyles = (...classes: any[]) => {
    return classes.filter(c => !!c).join(' ')
}
