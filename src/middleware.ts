import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./config";

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: ["/", "/(en|ja)/:path*"],
};
