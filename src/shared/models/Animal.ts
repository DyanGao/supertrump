export default class Animal {
  static properties: { [key: string]: { label: string; unit: string } } = {
    size: {
      label: "Größe",
      unit: "m",
    },
    weight: {
      label: "Gewicht",
      unit: "kg",
    },
    age: {
      label: "Alter",
      unit: "Jahre",
    },
    offspring: {
      label: "Nachkommen",
      unit: "",
    },
    speed: {
      label: "Geschwindigkeit",
      unit: "km/h",
    },
  };

  public id?: number;
  public favourite? = false;

  constructor(
    public name: string,
    public image: string,
    public size: number | "",
    public weight: number | "",
    public age: number | "",
    public offspring: number | "",
    public speed: number | ""
  ) {
    /* this.name = name;
    this.image = image;
    this.size = size;
    this.weight = weight;
    this.age = age;
    this.offspring = offspring;
    this.speed = speed; */
  }
}
