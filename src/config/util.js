export const LevelWorld = {
    1: "Mundo1",
    2: "Mundo2",
    3: "Mundo4",
    4: "Final"
  };


export function completeWithSpaces(input, length) {
    let output = input.toString();
    const spacesToAdd = Math.max(0, length - output.length); 
    output += " ".repeat(spacesToAdd);
    return output;
}
