import { AdSellType, TransactionType } from "@/config/enum";
import { gmailImageUrl, imageApi } from "./routes";
import { UserModel } from "@/models/user.model";
import { LocationModel } from "@/models/location.model";

export function mergeNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export const stopPropagation = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};
export const profileImgUrl = (url?: string, assets?: string) => {
  return url != undefined && url != ""
    ? url.startsWith(gmailImageUrl)
      ? url
      : `${imageApi}${url}`
    : assets ??
        "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png";
};

export const parseDate = (date: Date, symbol = "/", time = false) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return time
    ? `${year}${symbol}${
        month + 1 < 10 ? `0${month + 1}` : month + 1
      }${symbol}${day < 10 ? `0${day}` : day} ${
        hour < 10 ? `0${hour}` : hour
      }:${minute < 10 ? `0${minute}` : minute}:${
        second < 10 ? `0${second}` : second
      }`
    : `${year}${symbol}${
        month + 1 < 10 ? `0${month + 1}` : month + 1
      }${symbol}${day < 10 ? `0${day}` : day}`;
};

export const money = (value: string, currency = "", round = 1) => {
  let v = Math.round(+value / round) * round;
  return `${currency}${v
    .toString()
    .replaceAll(",", "")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const reportDescription = (
  name: string,
  area?: number,
  avg?: number,
  l?: LocationModel,
  d?: { room?: number; no?: string; floor?: number }
) => {
  // Таны Улаанбаатар хот, Хан уул дүүрэг, 11-р хороо, 17020, Жардин хотхон, 120-р байр, 6 дугаар давхарын 3 өрөө 80м.кв орон сууцны өнөөгийн зах зээлийн үнэ 160,950,000.00 төгрөг орчмын үнэтэй байна.
  const town =
    l?.town?.toLowerCase().includes("хотхон") ||
    l?.town?.toLowerCase().includes("хороолол");
  const no = d?.no
    ? ` ${d?.no}${isNaN(parseInt(d.no)) ? "" : "-р"} байр, `
    : "";
  const floor = d?.floor ? `${d.floor}-р давхарын ` : "";
  const room = d?.room ? `${d.room} өрөө ` : "";
  const location = `${l?.city} хот, ${l?.district} дүүрэг, ${
    l?.khoroo
  }-р хороо, ${l?.zipcode}, ${l?.town}${
    !town ? " хотхон" : ""
  },${no}${floor}${room}`;
  return `Иргэн ${name} таны ${location} ${area}м.кв орон сууцны
              өнөөгийн зах зээлийн үнэ
                ${money(
                  `${(avg ?? 0) * (area ?? 0)}`,
                  "",
                  100000
                )} төгрөг орчим үнэтэй байна. Энэхүү тооцоолол нь өгөгдөлд суурилж
                тооцоолсон бөгөөд ±5%-ийн хооронд хэлбэлзэх боломжтой.`;
};

export function formatPhoneNumber(phone: string) {
  if (!phone) return "";
  if (!phone.startsWith("+976") || phone.length !== 12) {
    return "Invalid number";
  }

  let digits = phone.slice(4);
  return `+976 ${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function formatNumber(num: string, length = 4) {
  return num.toString().padStart(length, "0");
}

export const getSellType = (type: AdSellType | string) => {
  switch (type) {
    case "Зарах":
      return AdSellType.sell;
    case "Түрээслүүлэх":
      return AdSellType.rent;
    case "Зарах, түрээслүүлэх":
      return AdSellType.sellRent;
    case "Зарсан":
      return AdSellType.sold;
    case "Түрээслэсэн":
      return AdSellType.rented;
    case AdSellType.sell:
      return "Зарах";
    case AdSellType.rent:
      return "Түрээслүүлэх";
    case AdSellType.sellRent:
      return "Зарах, түрээслүүлэх";
    case AdSellType.sold:
      return "Зарсан";
    case AdSellType.rented:
      return "Түрээслүүлсэн";

    default:
      return;
  }
};

export const getEstimateEnums = (est: string) => {
  switch (est) {
    case "estimated":
      return "Үнэлсэн";
    case "finished":
      return "Дууссан";
    case "pending":
      return "Хүлээгдэж байгаа";
    case "returned":
      return "Буцаагдсан";
    default:
  }
};

const isImage = (url: string) =>
  new Promise((resolve, reject) => {
    // check that is a valid url
    // then if valid url
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
export const imageExists = async (url: string) => {
  let img = "";
  await isImage(url)
    .then(() => {
      img = url;
    })
    .catch(() => {
      img = imageApi + url;
    });

  if (img == "") return undefined;
  return img;
};

export const getSuggestionValue = (suggestion: string) => {
  switch (suggestion) {
    case "room":
      return {
        id: "room",
        value: "Өрөөгөөр",
      };
    case "location":
      return {
        id: "location",
        value: "Байршлаар",
      };
    case "landUsage":
      return {
        id: "landUsage",
        value: "Зориулалтаар",
      };

    default:
      return;
  }
};
