export type FoodInfo = {
  title: string;
  image: string;
  description: string;
  rate: number;
};

const foodList: FoodInfo[] = [
  {
    title: "Sinigang",
    image:
      "https://www.lutongpinoyrecipe.com/wp-content/uploads/2020/12/lutong-pinoy-pork-sinigang-1200x900.jpg",
    description:
      "Sinigang is a Filipino soup or stew characterized by its sour and savory taste. It is most often associated with tamarind, although it can use other sour fruits and leaves as the souring agent. It is one of the more popular dishes in Filipino cuisine.",
    rate: 5,
  },
  {
    title: "Adobo",
    image:
      "https://scm-assets.constant.co/scm/unilever/e9dc924f238fa6cc29465942875fe8f0/247a0ccc-5205-4823-b524-0ba4ba14922a.png",
    description:
      "Philippine adobo is a popular Filipino dish and cooking process in Philippine cuisine that involves meat, seafood, or vegetables marinated in vinegar, soy sauce, garlic, bay leaves, and black peppercorns, which is browned in oil, and simmered in the marinade.",
    rate: 4,
  },
  {
    title: "Caldereta",
    image:
      "https://www.kawalingpinoy.com/wp-content/uploads/2019/04/spicy-beef-caldereta-2.jpg",
    description:
      "Kaldereta or caldereta is a goat meat stew from the Philippines. Variations of the dish use beef, chicken, or pork. Commonly, the goat meat is stewed with vegetables and liver paste. Vegetables may include tomatoes, potatoes, olives, bell peppers, and hot peppers. Kaldereta sometimes includes tomato sauce.",
    rate: 4,
  },

  {
    title: "Lechon Manok",
    image:
      "https://d1vnxpj2ayvwak.cloudfront.net/primary/3p/90/te/3p90temudrb92z3sgroektbxyactqgjp.jpg",
    description:
      "Lechon manok is a Filipino spit-roasted chicken dish made with chicken marinated in a mixture of garlic, bay leaf, onion, black pepper, soy sauce, and patis. The marinade may also be sweetened with muscovado or brown sugar. It is stuffed with tanglad and roasted over charcoal.",
    rate: 5,
  },
  {
    title: "Ginisang Munggo",
    image:
      "https://www.simpol.ph/wp-content/uploads/2020/11/GINISANG-MONGGO-1-636x1024.jpg",
    description:
      "Ginisang munggo is a Filipino savory mung bean soup. It is made with mung beans, garlic, tomatoes, onions, various vegetables, and patis. It is cooked with pork, tinapa, daing, or other seafood and meat. It is also commonly garnished with chicharon.",
    rate: 4,
  },
];

export default foodList;
