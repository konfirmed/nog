"use client";

import Link from "next/link";
import { useI18n } from "./i18n-provider";

export function NavLinks() {
  const { t } = useI18n();

  return (
    <>
      <Link
        href="/compare"
        className="text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        {t("nav.compare")}
      </Link>
      <Link
        href="/graph"
        className="text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        {t("nav.relationshipMap")}
      </Link>
    </>
  );
}
