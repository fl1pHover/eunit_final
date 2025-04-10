"use client";
import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, Suspense } from "react";
import { Loading } from "../loading";
import { Colors } from "@/base/constants";
import { ReportWrapper } from "@/_context";

const Template = ({ children }: { children: ReactNode }) => {
  const matches = useMediaQuery("(min-width: 50em)");

  return (
    <Suspense fallback={<Loading />}>
      <div
        className={`bg-[${Colors.lightIvory}] relative  pt-[60px] ${
          matches && "left-[60px]"
        }`}
        style={{
          width: matches ? "calc(100vw - 70px)" : "100vw",
        }}
      >
        <ReportWrapper>
          <div className="overflow-x-hidden">{children}</div>
        </ReportWrapper>
      </div>
    </Suspense>
  );

  return;
};

export default Template;
