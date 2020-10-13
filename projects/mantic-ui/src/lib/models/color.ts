export type ColorName = 'black' | 'grey' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'transparent'; // TODO: Define the other colors

export class Color {
    public static toClass(color: ColorName): object {
        const result = {};
        if (color) {
            result[color] = true;
        }
        return result;
    }
}
