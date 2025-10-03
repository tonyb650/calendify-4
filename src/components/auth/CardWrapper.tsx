"use client";

import { PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Header from "@/components/auth/Header";
import Social from "@/components/auth/Social";
import BackButton from "./BackButton";
import GuestLogin from "./GuestLogin";

type CardWrapperProps = {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showGuestLogin?: boolean
};
const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showGuestLogin
}: PropsWithChildren<CardWrapperProps>) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && 
        <CardFooter>
          <Social/>
        </CardFooter>
        
      }
      {showGuestLogin && 
        <CardFooter>
          <GuestLogin/>
        </CardFooter>
        
      }
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}/>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
