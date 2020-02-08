export type ColorName = 'black' | 'grey' | 'red' | 'blue'; // TODO: Define the other colors

export class Color {
    public static toClass(color: ColorName): object {
        const result = {};
        if (color) {
            result[color] = true;
        }
        return result;
    }
}
