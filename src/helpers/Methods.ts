export const secretIntializer = (Obj: any) => {
  if (process.env.JWT_SECRET !== undefined) {
    Obj.JWT_SECRET = process.env.JWT_SECRET;
  } else {
    throw new Error("JWT SECRET not found in .env File");
  }
};
