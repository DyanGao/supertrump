import Animal from "../shared/models/Animal";

function selectRandomProperty() {
  const properties = Object.keys(Animal.properties);
  const index = Math.floor(Math.random() * properties.length);
  return properties[index] as keyof Animal;
}

export default selectRandomProperty;
