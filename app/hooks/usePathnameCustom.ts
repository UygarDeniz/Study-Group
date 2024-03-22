"use client";

import React from "react";
import { usePathname } from "next/navigation";

function usePathnameCustom() {
    const pathname = usePathname();
    return pathname;
}

export default usePathnameCustom;
