"use client";

import { getUserData } from "@/(api)/auth.api";
import { getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import {
  AnalyzeWidget,
  ApartmentInfo,
  ResultWidget,
  UserWidget,
} from "@/components/report/result";
import {
  IconText,
  InlineText,
  ReportTitle,
  Spacer,
} from "@/components/report/shared";
import { ServiceCard } from "@/components/shared/card";
import { LocationModel } from "@/models/location.model";
import { Assets } from "@/utils/assets";
import { formatNumber, money, parseDate } from "@/utils/functions";
import { api, ConstantApi } from "@/utils/routes";
import {
  defaultMapCenter,
  defaultMapContainerStyle,
  defaultMapOptions,
  defaultMapZoom,
} from "@/utils/values";
import { Box, Button, Center, Flex, Text } from "@mantine/core";
import { useFetch, useMediaQuery } from "@mantine/hooks";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiCalendar, BiDownload } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import {
  IoIosArrowRoundBack,
  IoMdArrowBack,
  IoMdDownload,
} from "react-icons/io";
import { MdApartment } from "react-icons/md";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
type ResultType = {
  data: {
    min?: number;
    max?: number;
    avg?: number;
    area?: number;
    createdAt?: Date;
    no?: string;
    floor?: number;
    room?: number;
  };

  location: LocationModel;
};

const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const id = params.get("id");
  const { user, refetchUser } = useAppContext();
  const [data, setData] = useState<ResultType>();
  const router = useRouter();
  const getResult = async () => {
    setLoading(true);
    if (id == null) return;

    refetchUser();
    const res = await getRequestResult(+id);
    if (!res.success) {
      notifications.show({
        message: res.message,
      });
      router.back();
      return;
    }
    if (!res?.token) {
      router.push("/login");
      return;
    }
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);
  if (loading)
    return (
      <Center>
        <Loading />
      </Center>
    );

  const address = `${data?.location.city}, ${data?.location.district}, 
               ${
                 data?.location?.khoroo
                   ? `${data?.location?.khoroo}-р хороо,`
                   : ""
               } ${data?.location.town}`;

  return (
    <Box>
      <ReportTitle text={data?.location.town ?? ""}>
        <Box>
          <Flex
            style={{
              borderBottom: `1px solid ${Colors.deepMose20}`,
            }}
            mb={40}
            pb={10}
          >
            <Text
              fz={{
                sm: 30,
                base: 16,
              }}
              fw={{
                sm: "500",
                base: "700",
              }}
            >
              Зах зээлийн үнэлгээ
            </Text>
            {id && (
              <Text
                fz={{
                  sm: 30,
                  base: 16,
                }}
              >
                #{formatNumber(id)}
              </Text>
            )}
          </Flex>
          <Flex
            style={{
              borderBottom: `1px solid ${Colors.deepMose20}`,
            }}
            direction={{
              md: "row",
              base: "column",
            }}
            pb={12}
            justify={"start"}
            w={"100%"}
            columnGap={40}
          >
            <IconText child={<MdApartment size={24} />} text={"Орон сууц"} />
            <IconText child={<CiLocationOn size={24} />} text={address} />
            <IconText
              child={<BiCalendar size={24} />}
              text={parseDate(
                new Date(data?.data.createdAt?.toString() ?? Date()) ??
                  new Date(),
                "."
              )}
            />
          </Flex>

          <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          />
          <InlineText
            text="Таны сонгосон хотхоны м.кв-н үнэ цэн:"
            label={`    ${money(`${data?.data.min}`, "₮ ")}-${money(
              `${data?.data.max}`,
              "₮ "
            )}`}
          />
          <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          />
          <InlineText
            text="Таны орон сууцны м.кв тохиромжит үнэ:"
            label={` ${money(`${data?.data.avg ?? 0}`, "₮ ")}`}
            labelProps={{ c: "main" }}
          />

          <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          />
          <InlineText
            label={` ${money(
              `${Math.round(
                (Number(data?.data.avg) || 0) *
                  (parseFloat(`${data?.data.area}` || "0") || 0)
              )}`,
              "₮"
            )}`}
            text={`Таны ${data?.data?.area}м.кв орон сууцны нийт үнэ:`}
            labelProps={{ bg: "main", c: "white", py: 4, px: 20 }}
          />
          <Spacer size={20} />

          <Box w={150} h={1} bg={"deepMose20"} mb={24} mt={50} />
          <UserWidget user={user} />
          <Spacer
            size={{
              md: 100,
              sm: 60,
              base: 40,
            }}
          />
          <Text
            c={"headBlue"}
            fz={{
              sm: 20,
              base: 16,
            }}
          >
            Таны {data?.location.city} хот, {data?.location.district} дүүрэг,{" "}
            {data?.location.khoroo}
            {data?.location.khoroo && "-р хороо,"}{" "}
            {data?.location.zipcode ?? ""}, {data?.location.town} хотхон,{" "}
            {data?.data.no}
            {data?.data.no && "-р байр, "} {data?.data.floor}
            {data?.data.floor && " дугаар давхрын "}
            {data?.data.room} {data?.data.room && "өрөө"} {data?.data.area}м.кв
            орон сууцны өнөөгийн зах зээлийн үнэ{" "}
            {money(
              `${Math.round(
                (Number(data?.data.avg) || 0) *
                  (parseFloat(`${data?.data.area}` || "0") || 0)
              )}`
            )}{" "}
            төгрөг орчим үнэтэй байна. Энэхүү тооцоолол нь өгөгдөлд суурилж
            тооцоолсон бөгөөд ±5%-ийн хооронд хэлбэлзэх боломжтой.
          </Text>
          <Spacer size={24} />

          {/* <Spacer size={24} /> */}
          {/* <ResultWidget title={"Макро мэдээлэл"} props={{ w: "100%" }}>
            <Text
              fz={{
                md: 24,
                sm: 20,
                base: 16,
              }}
              mt={40}
            >
              Монгол банкны орон сууцны үнийн индекс
            </Text>
            <Text
              c={"grey"}
              fz={{
                md: 20,
                sm: 16,
                base: 14,
              }}
              mb={40}
            >
              Орон сууцны борлуулалт болон түрээсийн үнийн чиг хандлага, сул
              орон тоо, хүн амын өсөлт хөгжил
            </Text>
            <Box
              w={"100%"}
              className="makro"
              px={{
                md: 20,
                base: 0,
              }}
              py={12}
            >
              <Flex
                columnGap={40}
                direction={{
                  md: "row",
                  base: "column",
                }}
              >
                <AnalyzeWidget
                  border
                  label="Сүүлийн 1 жилээр"
                  text="Орон сууцны үнийн өсөлт"
                  value={12}
                />
                <Box flex={1} />
              </Flex>
              <Flex
                columnGap={40}
                direction={{
                  md: "row",
                  base: "column",
                }}
              >
                <AnalyzeWidget
                  label="Сүүлийн 1 жилээр"
                  text="Хүн амын өсөлт хөгжил"
                  value={3}
                />
                <AnalyzeWidget
                  label="Сүүлийн 1 жилээр"
                  text="Хэрэглээний үнийн индекс"
                  value={6}
                />
              </Flex>
            </Box>
          </ResultWidget> */}
          <Spacer size={24} />
          <ResultWidget title={"Байршил"}>
            <Spacer size={40} />
            <GoogleMap
              mapContainerStyle={defaultMapContainerStyle}
              center={
                data?.location.lat && data.location.lng
                  ? {
                      lat: data?.location.lat,
                      lng: data?.location.lng,
                    }
                  : defaultMapCenter
              }
              zoom={defaultMapZoom}
              options={defaultMapOptions}
            >
              {data?.location.lat && data.location.lng && (
                <Marker
                  position={{
                    lat: data?.location.lat,
                    lng: data?.location.lng,
                  }}
                />
              )}
            </GoogleMap>
          </ResultWidget>
        </Box>
        <Spacer
          size={{
            md: 32,
            base: 16,
          }}
        />

        <Flex w={"100%"} justify={"center"}>
          <Link href={`${api}request/service/pdf/${id}`} target="_blank">
            <Button
              radius={32}
              px={20}
              bg={"main"}
              fz={20}
              py={12}
              h={"auto"}
              leftSection={
                <Box
                  bg={"white"}
                  p={4}
                  style={{
                    borderRadius: "100%",
                  }}
                >
                  <IoMdDownload color={Colors.main} size={14} />
                </Box>
              }
            >
              Татаж авах (PDF)
            </Button>
          </Link>
        </Flex>

        <div
          id="pspdfkit"
          style={{
            width: "100%",
            height: "100vh",
          }}
        ></div>
        <Spacer size={32} />
        {/* <Text fz={30} fw={"bold"}>
          Санал болгож буй үйлчилгээ
        </Text>
        <Spacer size={32} />
        <Flex
          w={"100%"}
          pos={"relative"}
          columnGap={40}
          justify={"space-between"}
        >
          <ServiceCard
            bg={Assets.service}
            onClick={() => {}}
            text="Үнэлгээний тайлан"
          />
          <ServiceCard
            bg={Assets.service1}
            onClick={() => {}}
            text="оРОН СУУЦНЫ ДАТА ТАТАХ"
          />
        </Flex> */}
        <Spacer
          size={{
            md: 80,
            sm: 60,
            base: 40,
          }}
        />
        <Link href={"/report"}>
          <Button
            bg={"main"}
            py={8}
            h={"auto"}
            radius={0}
            leftSection={<IoIosArrowRoundBack color="white" size={24} />}
          >
            Дахин лавлагаа авах
          </Button>
        </Link>
        <Spacer size={40} />
      </ReportTitle>
      <Box
        style={{
          borderTopColor: Colors.deepMose20,
          borderTopWidth: 1,
          borderTopStyle: "solid",
        }}
        w={"100%"}
        bg={"white"}
      ></Box>
    </Box>
  );
};

export default Page;
