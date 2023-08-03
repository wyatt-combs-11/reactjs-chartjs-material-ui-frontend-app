
export default class ColorGenerator {
    static returnColors() {
        const colors = []
        for (let i = 0; i < 40; i++) {
            colors.push('#' + Math.floor(Math.random()*16777215).toString(16) + 'A0')
        }
        return colors;
    }
}