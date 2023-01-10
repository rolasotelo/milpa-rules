import { ItemCode } from "../common/enums.js";
import { ItemInterface } from "../common/Interfaces.js";
import { ItemBuilder } from "../common/types.js";

/**
 * @class Stringifier
 * @classdesc Convert other classes to strings and vice versa. All in a central place and in a consistent format.
 * @method getInstance - Get the instance of the class (Singleton).
 * @todo Maybe there is no need for singleton here.
 * @since 1.0.0
 */

class Stringifier {
  private static instance: Stringifier;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Stringifier {
    if (!Stringifier.instance) {
      Stringifier.instance = new Stringifier();
    }

    return Stringifier.instance;
  }

  public static stringifyItem(item: ItemInterface): string {
    return `${item.id}@${item.itemCode}@${item.turn}`;
  }

  public static createItemFromString(
    itemString: string,
    instantiate: ItemBuilder
  ): ItemInterface {
    const [id, cardCode, turn] = itemString.split("@");
    return instantiate(id, cardCode as ItemCode, Number(turn));
  }
}

export default Stringifier;
