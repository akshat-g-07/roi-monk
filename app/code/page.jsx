"use client";

import { Suspense, useState } from "react";
import { SITE_CONFIG } from "@/config/site";
import { GetRef, CreateRef } from "@/actions/ref";

function CodeGenerator(selectedPlatform, selectedOption, user) {
  const code = [];

  switch (selectedPlatform) {
    case "Twitter":
      code.push("T");
      break;
    case "Reddit":
      code.push("R");
      break;
    case "Facebook":
      code.push("F");
      break;
    case "Telegram":
      code.push("M");
      break;
    case "Whatsapp":
      code.push("W");
      break;
    case "Youtube":
      code.push("Y");
      break;
    case "Other":
      code.push("O");
      break;
  }

  switch (selectedOption) {
    case "Post":
      code.push("po");
      break;
    case "Comment":
      code.push("co");
      break;
    case "DM":
      code.push("dm");
      break;
    case "Community":
      code.push("cy");
      break;
    case "Group":
      code.push("gp");
      break;
    case "Status":
      code.push("ss");
      break;
    case "Subreddit":
      code.push("sr");
      break;
    case "Description":
      code.push("dn");
      break;
    case "Other":
      code.push("oo");
      break;
  }

  if (user === "akshat") {
    code.push("AT");
  } else {
    code.push("BA");
  }

  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString();

  const formattedDate = `${day}${month}${year}`;

  formattedDate.split("").forEach((digit) => {
    switch (digit) {
      case "0":
        code.push("a");
        break;
      case "1":
        code.push("b");
        break;
      case "2":
        code.push("c");
        break;
      case "3":
        code.push("d");
        break;
      case "4":
        code.push("e");
        break;
      case "5":
        code.push("f");
        break;
      case "6":
        code.push("g");
        break;
      case "7":
        code.push("h");
        break;
      case "8":
        code.push("i");
        break;
      case "9":
        code.push("j");
        break;
    }
  });

  return code.join("");
}

function CodeDeGenerator(code) {
  const details = {};

  const selectedPlatformChar = code[0];
  const selectedOptionChar = code[1] + code[2];
  const userChar = code[3] + code[4];
  const dateChar =
    code[5] +
    code[6] +
    code[7] +
    code[8] +
    code[9] +
    code[10] +
    code[11] +
    code[12];

  switch (selectedPlatformChar) {
    case "T":
      details.selectedPlatform = "Twitter";
      break;
    case "F":
      details.selectedPlatform = "Facebook";
      break;
    case "W":
      details.selectedPlatform = "Whatsapp";
      break;
    case "M":
      details.selectedPlatform = "Telegram";
      break;
    case "R":
      details.selectedPlatform = "Reddit";
      break;
    case "Y":
      details.selectedPlatform = "Youtube";
      break;
    case "Other":
      details.selectedPlatform = "Other";
      break;
  }

  switch (selectedOptionChar) {
    case "po":
      details.selectedOption = "Post";
      break;
    case "co":
      details.selectedOption = "Comment";
      break;
    case "dm":
      details.selectedOption = "DM";
      break;
    case "cy":
      details.selectedOption = "Community";
      break;
    case "gp":
      details.selectedOption = "Group";
      break;
    case "ss":
      details.selectedOption = "Status";
      break;
    case "sr":
      details.selectedOption = "Subreddit";
      break;
    case "dn":
      details.selectedOption = "Description";
      break;
    case "oo":
      details.selectedOption = "Other";
      break;
  }

  if (userChar === "AT") {
    details.user = "Akshat";
  } else {
    details.user = "Bhavya";
  }

  details.date = [];
  dateChar.split("").forEach((digit) => {
    switch (digit) {
      case "a":
        details.date.push("0");
        break;
      case "b":
        details.date.push("1");
        break;
      case "c":
        details.date.push("2");
        break;
      case "d":
        details.date.push("3");
        break;
      case "e":
        details.date.push("4");
        break;
      case "f":
        details.date.push("5");
        break;
      case "g":
        details.date.push("6");
        break;
      case "h":
        details.date.push("7");
        break;
      case "i":
        details.date.push("8");
        break;
      case "j":
        details.date.push("9");
        break;
    }
  });

  details.date = details.date.join("");

  const day = details.date.slice(0, 2);
  const month = details.date.slice(2, 4);
  const year = details.date.slice(4);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${day} ${monthNames[parseInt(month) - 1]} ${year}`;

  details.date = formattedDate;

  return details;
}

function CodePage() {
  const user = "akshat";
  const [name, setName] = useState("");
  const [options, setOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [writeUrl, setWriteUrl] = useState("");
  const [codeDecrypt, setCodeDecrypt] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [visited, setVisited] = useState([]);

  const platforms = [
    "Twitter",
    "Facebook",
    "Whatsapp",
    "Telegram",
    "Reddit",
    "Youtube",
    "Other",
  ];

  const optionsData = {
    Twitter: ["Post", "Comment", "DM", "Community"],
    Facebook: ["Post", "Comment", "DM", "Group"],
    Whatsapp: ["Status", "Community", "DM", "Group"],
    Telegram: ["Status", "DM", "Group"],
    Reddit: ["Subreddit", "DM"],
    Youtube: ["Comment", "Description"],
    Other: ["Other"],
  };

  const handlePlatformChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPlatform(selectedValue);
    setOptions(optionsData[selectedValue]);
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  const handleRoleChange = (e) => {
    const selectedValue = e.target.value;
    setRole(selectedValue);
  };

  const handleCompanyNameChange = (e) => {
    const inputValue = e.target.value;
    setCompanyName(inputValue);
  };

  return (
    <div className="w-full flex">
      <div className="w-1/2">
        <div className="w-full border-y">
          <div className="w-full flex items-center flex-col my-5">
            <h2>Fill this Form</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const encodedName = Buffer.from(name).toString("base64");
                const code = CodeGenerator(
                  selectedPlatform,
                  selectedOption,
                  user
                );
                const urlValue =
                  SITE_CONFIG.URL + "/?ref=" + code + encodedName;
                setUrl(urlValue);
              }}
              className="space-y-2 flex items-center flex-col"
            >
              <div>
                <label>Platform:</label>
                <select
                  value={selectedPlatform}
                  onChange={handlePlatformChange}
                  required
                  className="bg-blue-950"
                >
                  <option value="">Select a platform</option>
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPlatform && (
                <div>
                  <label>Option:</label>
                  <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    required
                    className="bg-blue-950"
                  >
                    <option value="">Select an option</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedOption && (
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="w-[400px] h-[40px] bg-blue-950"
                    required
                  />
                </div>
              )}
            </form>
          </div>
          <input
            value={url}
            readOnly
            className="w-full p-10 cursor-pointer text-center bg-blue-950"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          />
        </div>
        <div className="w-full border-y">
          <div className="w-full flex items-center flex-col my-5">
            <h2>Enter Value</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const writeUrlValue = writeUrl.split("ref=").pop();
                setCodeDecrypt({
                  ...CodeDeGenerator(writeUrlValue.slice(0, 13)),
                  name: Buffer.from(
                    writeUrlValue.slice(13),
                    "base64"
                  ).toString(),
                });
              }}
              className="space-y-2 flex items-center flex-col w-full"
            >
              <input
                value={writeUrl}
                className="w-full p-10 text-center bg-blue-950"
                onChange={(e) => {
                  setWriteUrl(e.target.value);
                }}
              />
            </form>

            {codeDecrypt.selectedPlatform && (
              <div>
                <label>Platform:</label>
                <input
                  readOnly
                  value={codeDecrypt.selectedPlatform}
                  className="p-5 cursor-pointer text-center w-fit bg-blue-950"
                />
              </div>
            )}

            {codeDecrypt.selectedOption && (
              <div>
                <label>Option:</label>
                <input
                  readOnly
                  value={codeDecrypt.selectedOption}
                  className="p-5 cursor-pointer text-center w-fit bg-blue-950"
                />
              </div>
            )}

            {codeDecrypt.user && (
              <div>
                <label>User:</label>
                <input
                  readOnly
                  value={codeDecrypt.user}
                  className="p-5 cursor-pointer text-center w-fit bg-blue-950"
                />
              </div>
            )}

            {codeDecrypt.date && (
              <div>
                <label>Date:</label>
                <input
                  readOnly
                  value={codeDecrypt.date}
                  className="p-5 cursor-pointer text-center w-fit bg-blue-950"
                />
              </div>
            )}
            {codeDecrypt.name && (
              <div>
                <label>Name:</label>
                <input
                  readOnly
                  value={codeDecrypt.name}
                  className="p-5 cursor-pointer text-center w-fit bg-blue-950"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="w-full border-y">
          <div className="w-full flex items-center flex-col my-5">
            <h2>Fill this Form</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const encodedName = Buffer.from(companyName).toString("base64");
                const encodedRole = Buffer.from(role).toString("base64");
                const encodedDate = Buffer.from(
                  new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                ).toString("base64");
                const refVal =
                  encodedName + "aa" + encodedRole + "aa" + encodedDate;

                const urlValue = SITE_CONFIG.URL + "/?ref=" + refVal;
                setUrl(urlValue);

                await CreateRef(refVal);
              }}
              className="space-y-2 flex items-center flex-col"
            >
              <div>
                <label>Company Name:</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  className="w-[400px] h-[40px] ml-5 bg-blue-950"
                  required
                />
              </div>
              <div>
                <label>Role:</label>
                <input
                  type="text"
                  value={role}
                  onChange={handleRoleChange}
                  className="w-[400px] h-[40px] ml-5 bg-blue-950"
                  required
                />
              </div>
              <button type="submit" className="p-4 border border-white">
                Submit
              </button>
            </form>
          </div>
          <input
            value={url}
            readOnly
            className="w-full p-10 cursor-pointer text-center bg-blue-950"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          />
        </div>
        <div className="w-full border-y">
          <div className="w-full flex items-center flex-col my-5">
            <h2>Enter Value</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setCodeDecrypt(
                  writeUrl
                    .split("ref=")
                    .pop()
                    .split("aa")
                    .map((item) => {
                      return Buffer.from(item, "base64").toString();
                    })
                );
                const response = await GetRef(writeUrl.split("ref=").pop());
                setVisited(response.data.visited);
              }}
              className="space-y-2 flex items-center flex-col w-full"
            >
              <input
                value={writeUrl}
                className="w-full p-10 text-center bg-blue-950"
                onChange={(e) => {
                  setWriteUrl(e.target.value);
                }}
              />
            </form>

            <div>
              <label>Company:</label>
              <input
                readOnly
                value={codeDecrypt[0]}
                className="p-5 cursor-pointer text-center w-fit bg-blue-950"
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                readOnly
                value={codeDecrypt[1]}
                className="p-5 cursor-pointer text-center w-fit bg-blue-950"
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                readOnly
                value={codeDecrypt[2]}
                className="p-5 cursor-pointer text-center w-fit bg-blue-950"
              />
            </div>
            <div>
              <p>Visited:</p>
              {visited.map((item, index) => (
                <p key={index}>
                  {item
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(/ /g, "-") +
                    " " +
                    item.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <CodePage />
    </Suspense>
  );
}
