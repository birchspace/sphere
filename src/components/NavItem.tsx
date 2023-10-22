"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { usePathname } from "next/navigation";

export function NavItem(
  props: React.PropsWithChildren<{
    href: string;
    title: string;
    description: string;
    disableHighlight?: boolean;
    scroll?: boolean;
  }>,
) {
  const pathname = usePathname();
  const highlight =
    !props.disableHighlight && props.href === pathname && "pointer-events-none";
  return (
    <li>
      <NavigationMenu.Link
        asChild
        className={`z-[999] block rounded-lg p-3 duration-250 ease-out hover:bg-neutral-50/10 active:opacity-75 active:duration-75 ${highlight}`}
      >
        <Link href={props.href} scroll={props.scroll}>
          <span className="pb-0.5 font-display text-xl font-semibold text-neutral-50">
            {!props.disableHighlight && props.href === pathname && (
              <i className="ri-arrow-right-s-line mr-1.5 font-normal text-green" />
            )}
            {props.title}
          </span>
          <p className="break-words break-all">{props.description}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}
