
export default class ColorGenerator {
    static returnColors() {
        const blue = [22, 91, 170]
        const purple = [161, 85, 185]
        const lightGreen = [144, 238, 144]
        const colors = []
        for (let i = 0; i < 40; i++) {
            if (Math.random() > 0.5) {
                colors.push(ColorGenerator.mixColors(blue, purple, Math.random()));
            } else {
                colors.push(ColorGenerator.mixColors(blue, lightGreen, Math.random()));
            }
        }
        return colors;
    }

    static mixColors(color1, color2, alpha) {
        const r = color1[0] * alpha + color2[0] * (1 - alpha);
        const g = color1[1] * alpha + color2[1] * (1 - alpha);
        const b = color1[2] * alpha + color2[2] * (1 - alpha);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + (0.5 + Math.random() / 2) + ')'
    }
}