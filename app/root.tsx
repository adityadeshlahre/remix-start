import type { ReactNode } from "react";
import {
  Form,
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

// export function Layout({ children }: { children: ReactNode }) {
// 	return (
// 	  <html lang="en">
// 		<head>
// 		  <meta charSet="utf-8" />
// 		  <meta
// 			name="viewport"
// 			content="width=device-width, initial-scale=1"
// 		  />
// 		  <Meta />
// 		  <Links />
// 		</head>
// 		<body>
// 		  {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
// 		  {children}
// 		  <Scripts />
// 		  <ScrollRestoration />
// 		  <LiveReload />
// 		</body>
// 	  </html>
// 	);
// }

// export default function App() {
// 	return (
// 		<html lang="en">
// 			<head>
// 				<meta charSet="utf-8" />
// 				<meta name="viewport" content="width=device-width, initial-scale=1" />
// 				<Meta />
// 				<Links />
// 			</head>
// 			<body>
// 				<div id="sidebar">
// 					<h1 className="text-red-700">Remix Contacts</h1>
// 					<div>
// 						<Form id="search-form" role="search">
// 							<input
// 								id="q"
// 								aria-label="Search contacts"
// 								placeholder="Search"
// 								type="search"
// 								name="q"
// 							/>
// 							<div id="search-spinner" aria-hidden hidden={true} />
// 						</Form>
// 						<Form method="post">
// 							<button type="submit">New</button>
// 						</Form>
// 					</div>
// 					<nav>
// 						<ul>
// 							<li>
// 								<a href={`/contacts/1`}>Your Name</a>
// 							</li>
// 							<li>
// 								<a href={`/contacts/2`}>Your Friend</a>
// 							</li>
// 						</ul>
// 					</nav>
// 				</div>

// 				<ScrollRestoration />
// 				<Scripts />
// 			</body>
// 		</html>
// 	);
// }

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </>
  );
}
