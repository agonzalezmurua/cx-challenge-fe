const Router = {
  push: jest.fn(),
};

export * from "next/router";
export const useRouter = jest.fn();
export default Router;
