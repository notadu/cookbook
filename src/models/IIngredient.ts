export interface IMeasure {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export default interface IIngredient {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: {
    us: IMeasure;
    metric: IMeasure;
  };
  meta: string[];
  metaInformation: string[];
  name: string;
  original: string;
  originalName: string;
  originalString: string;
  unit: string;
}
