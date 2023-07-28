export default class ColorGenerator {
    static returnColors() {
        const letters = '0123456789ABCDEF';
        const colors = []
        for (let i = 0; i < 30; i++) {
            let color = '#';
            for (let j = 0; j < 6; j++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            colors.push(color + "80");
        }
        return colors;
    }
}