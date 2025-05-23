"use client";

import { useState } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import BarChartIcon from "@mui/icons-material/BarChart";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import Image from "next/image";

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: "14px" }} />,
      label: "Data Privacy",
      detail:
        "Your data is securely encrypted, ensuring complete safety and confidentiality.",
      image: "privacy",
    },
    {
      icon: <BarChartIcon sx={{ fontSize: "14px" }} />,
      label: "Detailed Reports",
      detail:
        "Understand and track how your investments are performing by looking at reports on dashboard.",
      image: "reports",
    },
    {
      icon: <PhoneAndroidIcon sx={{ fontSize: "14px" }} />,
      label: "Multi Device Support",
      detail:
        "Track and manage your investments effortlessly across smartphones, tablets, and laptops.",
      image: "responsive",
    },
    {
      icon: <EnhancedEncryptionIcon sx={{ fontSize: "14px" }} />,
      label: "Secure & Fast Sign-In",
      detail:
        "Sign in securely using your Google account for a seamless experience.",
      image: "signon",
    },
  ];

  return (
    <div className="w-fit py-10 text-center">
      <h2 className="text-3xl text-white leading-[1.15] font-bold">
        Why ROI Monk just makes sense for you!
      </h2>
      <div className="rounded mx-4 w-[250px] md:w-[750px] h-[330px] md:h-[390px] overflow-hidden border border-gray-400 mt-6">
        <div className="w-full h-fit flex justify-between items-center border-b border-gray-400">
          {features.map((feature, index) => {
            return (
              <div
                key={feature.label}
                className={`w-1/4 flex justify-center items-center px-2 py-4 ${
                  index === selectedFeature
                    ? "bg-white text-black font-semibold"
                    : "bg-[#1F2937] text-white font-normal"
                } md:space-x-2 cursor-pointer`}
                onClick={() => {
                  setSelectedFeature(index);
                }}
              >
                {feature.icon}
                <p className="hidden md:block text-sm">{feature.label}</p>
              </div>
            );
          })}
        </div>
        <div className="w-full h-[280px] md:h-[340px] flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/3 h-fit md:h-full p-2 md:p-4 md:leading-relaxed">
            {features[selectedFeature].detail}
          </div>
          <div className="w-full md:w-2/3 h-fit border-t md:border-l md:border-t-0 border-gray-200">
            <Image
              src={`/${features[selectedFeature].image}.png`}
              width={498}
              height={338}
              alt="Feature Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
