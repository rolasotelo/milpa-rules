import { CardWithoutIdInterface } from "./Interfaces.js";
import { CardCode } from "./enums.js";

export const CORN_CARD_INFO: CardWithoutIdInterface = {
  code: CardCode.CORN,
  name: "Corn",
  description:
    "Corn is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. The leafy stalk of the plant produces separate pollen and ovuliferous inflorescences or ears, which are fruits, yielding kernels or seeds.",
  summary: "corn is very important for the Aztecs",
};

export const BEANS_CARD_INFO: CardWithoutIdInterface = {
  code: CardCode.BEANS,
  name: "Beans",
  description:
    "Beans are a type of legume, or fruit, that grow in pods. There are many different kinds of beans, including kidney beans, black beans, pinto beans, and lima beans. Beans are a good source of protein and fiber.",
  summary: "beans are very important for the Aztecs",
};
