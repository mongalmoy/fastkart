export const db_tables = {
  user: {
    name: "users",
    rows: ["name", ""]
  },
  products_desc: {
    name: "products_desc"
  },
  user_cart: {
    name: "user_cart",
  }
}

export const apis = {
  POSTGRE_BASE_URL: "http://" + process.env.PG_HOST + process.env.PG_PORT ? `:${process.env.PG_PORT}/` : "/",
  SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_HOST,
};

export const hashing = {
  saltingNo: process.env.SALT_NO,
}