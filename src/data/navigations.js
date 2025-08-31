import BabyBoy from "components/icons/BabyBoy";
import BabyGirl from "components/icons/BabyGirl";
import Car from "components/icons/Car";
import Dress from "components/icons/Dress";
import Food from "components/icons/Food";
import Gift from "components/icons/Gift";
import Laptop from "components/icons/Laptop";
import MakeUp from "components/icons/MakeUp";
import Man from "components/icons/Man";
import Microphone from "components/icons/Microphone";
import MotorBike from "components/icons/MotorBike";
import Pets from "components/icons/Pets";
import PlantPot from "components/icons/PlantPot";
import TeddyBear from "components/icons/TeddyBear";
import Woman from "components/icons/Woman";
const navigations = [
  {
    icon: Dress,
    title: "Male Glasses",
    href: `/products?category=${"Male Glasses"}`,
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: Dress,
        title: "Fashion",
        href: `/products?category=${"Male Glasses,Fashion"}`,
      },
      {
        icon: Laptop,
        title: "Sunglasses",
        href: `/products?category=${"Male Glasses,Sunglasses"}`,
      },
      {
        icon: Laptop,
        title: "Sunglasses",
        href: `/products?category=${"Male Glasses,Sunglasses"}`,
      },
    ],
  },
  {
    icon: Dress,
    title: "Female Glasses",
    href: `/products?category=${"Female Glasses"}`,
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: Dress,
        title: "Fashion",
        href: `/products?category=${"Female Glasses,Fashion"}`,
      },
      {
        icon: Laptop,
        title: "Sunglasses",
        href: `/products?category=${"Female Glasses,Sunglasses"}`,
      },
    ],
  },
  {
    icon: Dress,
    title: "Brands",
    href: `/product`,
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: Dress,
        title: "Armani",
        href: `/products?brand=${"Armani"}`,
      },
      {
        icon: Laptop,
        title: "Dunhill",
        href: `/products?brand=${"Dunhill"}`,
      },
    ],
  },
  {
    icon: MakeUp,
    title: "Accessories",
    href: `/products?category=${"Accessories"}`,
    menuComponent: "MegaMenu1",
  },
];
export default navigations;
