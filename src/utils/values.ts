import { locale } from "@/base/vocabs/mn";
import { ItemPosition, ItemTypes, TransactionType } from "@/config/enum";
import { DistrictAssets } from "./assets";

export const categoryNames = [
  "Орон сууц",
  "Газар",
  "Худалдаа, үйлчилгээний талбай",
  "АОС, хаус, амралтын газар",
  "Хашаа байшин, гэр",
  "Үйлдвэр, агуулах, обьект",
  "Оффис",
  "Гараж, контейнер",
];
export const districts = [
  {
    name: "Хан уул дүүрэг",
    id: "Хан-Уул",
    img: DistrictAssets.khanuul,
    committee: 25,
  },
  {
    name: "Сүхбаатар дүүрэг",
    id: "Сүхбаатар",
    img: DistrictAssets.sukhbaatar,
    committee: 20,
  },
  {
    name: "Налайх дүүрэг",
    id: "Налайх",
    img: DistrictAssets.nalaikh,
    committee: 8,
  },
  {
    name: "Сонгинохайрхан дүүрэг",
    id: "Сонгинохайрхан",
    img: DistrictAssets.songinoKhairkhan,
    committee: 43,
  },
  {
    name: "Баянзүрх дүүрэг",
    id: "Баянзүрх",
    img: DistrictAssets.bayanzurkh,
    committee: 43,
  },
  {
    name: "Баянгол дүүрэг",
    id: "Баянгол",
    img: DistrictAssets.bayangol,
    committee: 34,
  },
  {
    name: "Чингэлтэй дүүрэг",
    id: "Чингэлтэй",
    img: DistrictAssets.chingeltei,
    committee: 24,
  },
];

export const defaultMapContainerStyle = {
  width: "100%",
  height: "50vh",
};
export const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,

  mapTypeId: "hybrid",
  disableDefaultUI: false,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoom: 16,
  gestureHandling: "greedy",
};
export const defaultMapZoom = 18;
export const defaultMapCenter = {
  lat: 47.9166464,
  lng: 106.9154304,
};

export const TransactionValue = (type: TransactionType) => {
  if (type == TransactionType.outcome) {
    return {
      text: "Зарлага",
      color: "#EB973D",
    };
  }
  return {
    text: "Орлого",
    color: "main",
  };
};

export const TransactionValues = (name: string) => {
  return [
    {
      name: "Дансны дугаар",
      value: "5700 3860 71",
    },
    {
      name: "Дансны нэр",
      value: "Бом Менежмент",
    },
    {
      name: "Гүйлгээний утга",
      value: name,
    },
  ];
};

export const ProfileValues = {
  firstname: {
    text: "Овог",
    pl: "Нэр",
  },
  lastname: {
    text: "Нэр",
    pl: "Нэр",
  },
  email: {
    text: "Цахим хаяг",
    pl: "нэр",
  },
  phone: {
    text: "Утасны дугаар",
    pl: "Нэр",
  },
};

export const ContactFormValues = {
  name: {
    label: "Овог нэр",
    description: "Өөрийн овог нэрийг оруулна уу.",
  },
  position: {
    label: "Албан тушаал",
    description: "Албан тушаалийн мэдээллийг оруулах.",
  },
  phone: {
    label: "Холбогдох дугаар",
    description: "Хувийн утасны дугаарыг оруулна уу.",
  },
  organization: {
    label: "Ажилладаг байгууллагын нэр",
    description: "Байгууллагын нэр эсвэл хувиараа гэх мэт.",
  },
  purpose: {
    label: "Холбогдож буй зорилго",
    description:
      "Хөрөнгө оруулалт, мэдээлэл солилцох, мэдээлэл  худалдан авах гэх мэт тайлбарлан бичнэ үү.",
  },
};

export const reportRoutes = (slug: string) => {
  if (slug == "district") return "location";
  if (slug == "location") return "area";
  if (slug == "area") return "result";
};

export const itemNames = [
  {
    name: "Ашиглалтад орсон он",
    id: "operation",
    range: true,
    location: false,
  },
  {
    name: "Талбай",
    id: "area",
    range: true,
    location: false,
  },
  {
    name: "Үнэ",
    id: "price",
    range: true,
    location: false,
  },
  {
    name: "Хэдэн давхарт",
    id: "howFloor",
    range: true,
    location: false,
  },
  {
    name: "Дүүрэг",
    id: "district",
    range: false,
    location: true,
  },
  {
    name: "Байршил",
    id: "location",
    range: false,
    location: true,
  },
];

export const locationCenter = {
  lat: 47.91887307876936,
  lng: 106.91757202148438,
};

export const createAdNav = [
  {
    tabName: "Зар нэмэх",
    id: "ad/create",

    submenu: [
      {
        tab: "Зар нэмэх",
        href: "ad/create",
      },
      {
        tab: "Зар хуваалцах",
        href: "ad/sharing",
      },
    ],
  },
];

export const NavbarValue = [
  { name: locale.data.NAVBAR.HOME, href: "/" },
  { name: locale.data.NAVBAR.ESTIMATE, href: "/report" },
  { name: locale.data.NAVBAR.WALLET, href: "/wallet" },
  { name: locale.data.NAVBAR.CONTACT, href: "/contact" },
];

export const buildingFloorValues = [
  {
    label: "B2",
    value: "B2",
  },
  {
    label: "B1",
    value: "B1",
  },
  ...Array.from({ length: 30 }, (_, i) => {
    return {
      label: `${1 + i}`,
      value: `${1 + i}`,
    };
  }),
];

export const buildingFloorName = {
  id: "buildingFloor",
  types: ItemTypes.dropdown,
  isUse: true,
  index: 3,
  name: "Барилгын давхар",
  position: ItemPosition.default,
  value: buildingFloorValues,
};
export const areaName = {
  id: "area",
  types: ItemTypes.text,
  isUse: true,
  isSearch: true,
  index: -1,
  name: "Талбай",
  position: ItemPosition.any,
};
export const priceName = {
  id: "price",
  types: ItemTypes.text,
  index: 0,
  name: "Үнэ",
  position: ItemPosition.side,
};

export const operationName = {
  id: "operation",
  type: ItemTypes.date,
  isSearch: true,
  index: 2,
  isUse: true,
  name: "Ашиглалтад орсон он",
  other: false,
  position: ItemPosition.default,
};
export const howFloorName = {
  id: "howFloor",
  type: ItemTypes.dropdown,
  isSearch: true,
  index: 4,
  parent: "buildingFloor",
  name: "Хэдэн давхарт",
  isUse: true,
  position: ItemPosition.default,
};

export const SellTypesString = ["Зарах", "Түрээслүүлэх"];
