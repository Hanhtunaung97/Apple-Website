import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="px-5 sm:px-10 py-5">
      <div className="screen-max-width">
        <div>
          <p className=" font-semibold text-gray text-sm">
            More ways to shop{" "}
            <span className="text-blue underline">Find an apple store</span> or{" "}
            <span className="text-blue underline">other retailer</span> near
            you.
          </p>
          <p className=" font-semibold text-gray text-sm">
            or call 1-800-MY-APPLE.
          </p>
        </div>
        <div className="w-full my-5 h-[1px] bg-gray-700" />
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center">
          <p className="text-gray text-sm">
            Copyright © 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex gap-x-3">
            {footerLinks.map((link, index) => (
              <p key={index} className="text-gray text-sm font-semibold">
                {link}{" "}
                {index !== footerLinks.length - 1 && (
                  <span className="mx-2">|</span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
