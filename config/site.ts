export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "NCW PoC",
	description: "An Example PoC for Fireblocks integration with Next.js and NextUI",
	navItems: [
		{
			label: "App",
			href: "/",
		},
    {
      label: "Docs",
      href: "https://ncw-developers.fireblocks.com/docs/setup",
    },
	  {
		label: "Github",
		href: "/https://github.com/manoranjith-shankar/fireblocks-web-app",
	  }
	]
};
