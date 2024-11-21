import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const cookiesToken = request.cookies.get("token");
  const token = cookiesToken?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SIGN_PRIVATE_KEY)
    );
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    "/",
    "/product",
    "/cart",
    "/my-account",
    "/my-account/orders",
    "/my-account/edit",
    "/my-account/change-password",
    "/my-account/delete",
    "/checkout",
  ],
};
