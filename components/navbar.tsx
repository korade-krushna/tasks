"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/navbar-menu";
import { cn } from "@/lib/util";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center drop-shadow-xl">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >

            <Menu setActive={setActive}>
                <HoveredLink href="/dashboard">Dashboard</HoveredLink>
                <HoveredLink href="/tasks">Tasks</HoveredLink>
                <MenuItem setActive={setActive} active={active} item="Manage">
                    <HoveredLink href="/lakshay">Lakshay</HoveredLink>
                </MenuItem>
                <HoveredLink href="/past">Past</HoveredLink>
            </Menu>
        </div>
    );
}
