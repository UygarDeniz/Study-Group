export { default } from "next-auth/middleware"


export const config = { matcher: ["/groups/new/:path*", "/groups/:groupId/new/:path*", "/profile/me/:path*" ] }